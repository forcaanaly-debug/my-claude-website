'use client'
import { useEffect, useState, useRef, useCallback } from 'react'

interface ContextMenu { x: number; y: number; el: HTMLElement }
interface AIModal { field: string; fieldType: string; currentValue: string }
interface ImageModal { field: string; currentSrc: string }
interface ThemePanel { open: boolean }
type Colors = Record<string, string>

function getCookie(name: string) {
  return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] ?? null
}

function deepSet(obj: Record<string, unknown>, path: string, value: string) {
  const parts = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {}
    cur = cur[parts[i]]
  }
  cur[parts[parts.length - 1]] = value
}

export default function LiveEditor() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<ContextMenu | null>(null)
  const [aiModal, setAiModal] = useState<AIModal | null>(null)
  const [imgModal, setImgModal] = useState<ImageModal | null>(null)
  const [themePanel, setThemePanel] = useState<ThemePanel>({ open: false })
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiProvider, setAiProvider] = useState<'claude' | 'gemini'>('claude')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [colors, setColors] = useState<Colors>({})
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const pendingRef = useRef<Record<string, unknown>>({})

  useEffect(() => {
    if (getCookie('admin_ui') === '1') setIsAdmin(true)
  }, [])

  // Inject edit-mode styles
  useEffect(() => {
    const style = document.createElement('style')
    style.id = '__live-edit-style'
    style.textContent = `
      body.edit-mode [data-field] {
        outline: 2px dashed rgba(139,105,20,0.5);
        outline-offset: 2px;
        cursor: pointer;
        transition: outline 0.15s;
      }
      body.edit-mode [data-field]:hover {
        outline: 2px solid #c9a84c;
        outline-offset: 3px;
      }
      body.edit-mode [data-field-type="image"]:hover::after {
        content: "🖼  Click to replace image";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: rgba(0,0,0,0.75);
        color: #fff;
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
        font-family: system-ui, sans-serif;
        pointer-events: none;
        z-index: 9999;
        white-space: nowrap;
      }
      body.edit-mode [data-field-type="image"] { position: relative; }
    `
    document.head.appendChild(style)
    return () => { document.getElementById('__live-edit-style')?.remove() }
  }, [])

  // Load theme colors
  useEffect(() => {
    if (!isAdmin) return
    fetch('/api/admin/content').then(r => r.json()).then(data => {
      if (data?.theme) setColors(data.theme)
      pendingRef.current = data ?? {}
    })
  }, [isAdmin])

  // Toggle edit mode
  useEffect(() => {
    if (editMode) document.body.classList.add('edit-mode')
    else document.body.classList.remove('edit-mode')
  }, [editMode])

  // Context menu handler
  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (!editMode) return
    const el = (e.target as HTMLElement).closest('[data-field]') as HTMLElement | null
    if (!el) return
    e.preventDefault()
    setCtxMenu({ x: e.clientX, y: e.clientY, el })
  }, [editMode])

  // Click on field element (for images)
  const handleClick = useCallback((e: MouseEvent) => {
    if (!editMode) return
    const el = (e.target as HTMLElement).closest('[data-field]') as HTMLElement | null
    if (!el) return
    if (el.dataset.fieldType === 'image') {
      e.preventDefault()
      setImgUrl(el.dataset.fieldValue ?? '')
      setImgModal({ field: el.dataset.field!, currentSrc: el.dataset.fieldValue ?? '' })
      setCtxMenu(null)
    }
  }, [editMode])

  const closeAll = useCallback(() => setCtxMenu(null), [])

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('click', handleClick)
    window.addEventListener('click', closeAll)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('click', handleClick)
      window.removeEventListener('click', closeAll)
    }
  }, [handleContextMenu, handleClick, closeAll])

  // --- Save helpers ---
  async function saveField(field: string, value: string) {
    const content = pendingRef.current as Record<string, unknown>
    deepSet(content, field, value)
    pendingRef.current = content
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    // Update the live DOM element
    document.querySelectorAll(`[data-field="${field}"]`).forEach(el => {
      (el as HTMLElement).dataset.fieldValue = value
      if ((el as HTMLElement).dataset.fieldType === 'text') {
        el.textContent = value
      } else if ((el as HTMLElement).dataset.fieldType === 'image') {
        const img = el.querySelector('img')
        if (img) img.src = value
      }
    })
  }

  async function saveAll() {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pendingRef.current),
    })
    setSaving(false)
    setSavedMsg('Saved!')
    setTimeout(() => setSavedMsg(''), 2000)
  }

  // --- Direct inline text edit ---
  function openInlineEdit(el: HTMLElement) {
    if (el.dataset.fieldType !== 'text') return
    el.contentEditable = 'true'
    el.style.outline = '2px solid #c9a84c'
    el.focus()
    const field = el.dataset.field!
    const onBlur = async () => {
      el.contentEditable = 'false'
      el.style.outline = ''
      await saveField(field, el.textContent ?? '')
      setSavedMsg('Saved!')
      setTimeout(() => setSavedMsg(''), 2000)
    }
    el.addEventListener('blur', onBlur, { once: true })
    setCtxMenu(null)
  }

  // --- AI ---
  async function runAI() {
    if (!aiModal) return
    setAiLoading(true)
    setAiSuggestion('')
    const res = await fetch('/api/admin/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: aiPrompt,
        context: aiModal.currentValue,
        field: aiModal.field,
        provider: aiProvider,
      }),
    })
    const data = await res.json()
    setAiSuggestion(data.result ?? data.error ?? 'No result')
    setAiLoading(false)
  }

  async function applyAI() {
    if (!aiModal || !aiSuggestion) return
    await saveField(aiModal.field, aiSuggestion)
    setSavedMsg('Applied!')
    setTimeout(() => setSavedMsg(''), 2000)
    setAiModal(null)
    setAiSuggestion('')
    setAiPrompt('')
  }

  // --- Image save ---
  async function applyImage() {
    if (!imgModal) return
    await saveField(imgModal.field, imgUrl)
    setSavedMsg('Image updated!')
    setTimeout(() => setSavedMsg(''), 2000)
    setImgModal(null)
  }

  // --- Theme ---
  function updateColor(key: string, value: string) {
    setColors(prev => ({ ...prev, [key]: value }))
    const content = pendingRef.current as { theme?: Record<string, string> }
    if (!content.theme) content.theme = {}
    content.theme[key] = value
    // Apply live via CSS variable
    document.documentElement.style.setProperty(
      `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
      value
    )
  }

  if (!isAdmin) return null

  const colorLabels: Record<string, string> = {
    charcoal: 'Background',
    stone: 'Body text',
    sand: 'Section bg',
    offwhite: 'Light bg',
    bronze: 'Accent',
    bronzePale: 'Accent light',
  }

  return (
    <>
      {/* Floating admin bar */}
      <div style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
      }}>
        {editMode && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setThemePanel(p => ({ open: !p.open }))}
              style={pillBtn('#333')}
            >
              🎨 Theme
            </button>
            <button onClick={saveAll} disabled={saving} style={pillBtn('#2a5c3f')}>
              {saving ? 'Saving…' : savedMsg || '💾 Save All'}
            </button>
            <button onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.reload() }} style={pillBtn('#5a2a2a')}>
              Log out
            </button>
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {savedMsg && !editMode && (
            <span style={{ fontSize: '0.72rem', color: '#2a5c3f', background: '#e8f5e9', padding: '0.3rem 0.7rem' }}>
              {savedMsg}
            </span>
          )}
          <button
            onClick={() => setEditMode(e => !e)}
            style={{
              padding: '0.6rem 1.1rem',
              background: editMode ? '#8b6914' : '#1a1a1a',
              color: '#faf8f4',
              border: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {editMode ? '✏️ Editing — click text or right-click' : '✏️ Edit Site'}
          </button>
        </div>
      </div>

      {/* Theme colour panel */}
      {themePanel.open && editMode && (
        <div style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1.25rem',
          zIndex: 9999,
          background: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '1.25rem',
          width: '260px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b6914', marginBottom: '1rem' }}>
            Colour Theme
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {Object.entries(colorLabels).map(([key, label]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="color"
                  value={colors[key] ?? '#000000'}
                  onChange={e => updateColor(key, e.target.value)}
                  style={{ width: '28px', height: '24px', border: 'none', padding: 0, background: 'none', cursor: 'pointer', flexShrink: 0 }}
                />
                <input
                  type="text"
                  value={colors[key] ?? ''}
                  onChange={e => updateColor(key, e.target.value)}
                  style={{ flex: 1, padding: '0.3rem 0.5rem', background: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#faf8f4', fontSize: '0.75rem', outline: 'none' }}
                />
                <span style={{ fontSize: '0.68rem', color: '#555', minWidth: '70px' }}>{label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={saveAll}
            style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: '#8b6914', color: '#fff', border: 'none', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Save Theme
          </button>
        </div>
      )}

      {/* Right-click context menu */}
      {ctxMenu && (
        <div
          style={{
            position: 'fixed',
            top: ctxMenu.y,
            left: ctxMenu.x,
            zIndex: 10001,
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '200px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ padding: '0.4rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '0.6rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              {ctxMenu.el.dataset.field}
            </p>
          </div>
          {ctxMenu.el.dataset.fieldType === 'text' && (
            <MenuItem
              icon="✏️"
              label="Edit directly"
              onClick={() => openInlineEdit(ctxMenu.el)}
            />
          )}
          {ctxMenu.el.dataset.fieldType === 'image' && (
            <MenuItem
              icon="🖼"
              label="Replace image"
              onClick={() => {
                setImgUrl(ctxMenu.el.dataset.fieldValue ?? '')
                setImgModal({ field: ctxMenu.el.dataset.field!, currentSrc: ctxMenu.el.dataset.fieldValue ?? '' })
                setCtxMenu(null)
              }}
            />
          )}
          <MenuItem
            icon="✦"
            label="Edit with Claude"
            onClick={() => {
              setAiProvider('claude')
              setAiModal({ field: ctxMenu.el.dataset.field!, fieldType: ctxMenu.el.dataset.fieldType!, currentValue: ctxMenu.el.dataset.fieldValue ?? ctxMenu.el.textContent ?? '' })
              setAiPrompt('')
              setAiSuggestion('')
              setCtxMenu(null)
            }}
          />
          <MenuItem
            icon="✦"
            label="Edit with Gemini"
            onClick={() => {
              setAiProvider('gemini')
              setAiModal({ field: ctxMenu.el.dataset.field!, fieldType: ctxMenu.el.dataset.fieldType!, currentValue: ctxMenu.el.dataset.fieldValue ?? ctxMenu.el.textContent ?? '' })
              setAiPrompt('')
              setAiSuggestion('')
              setCtxMenu(null)
            }}
          />
        </div>
      )}

      {/* AI Modal */}
      {aiModal && (
        <Modal onClose={() => setAiModal(null)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#faf8f4', margin: 0 }}>
              Edit with {aiProvider === 'claude' ? 'Claude' : 'Gemini'}
            </h3>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {(['claude', 'gemini'] as const).map(p => (
                <button key={p} onClick={() => setAiProvider(p)} style={{ padding: '0.25rem 0.6rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', background: aiProvider === p ? '#8b6914' : 'transparent', color: aiProvider === p ? '#fff' : '#555', border: `1px solid ${aiProvider === p ? '#8b6914' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem', padding: '0.6rem 0.75rem', background: '#111', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.82rem', color: '#777', maxHeight: '72px', overflow: 'auto', wordBreak: 'break-all' }}>
            {aiModal.currentValue}
          </div>
          <textarea
            autoFocus
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runAI() }}
            placeholder="Describe the change… (⌘↵ to generate)"
            rows={3}
            style={{ width: '100%', padding: '0.6rem 0.75rem', background: '#111', border: '1px solid rgba(255,255,255,0.12)', color: '#faf8f4', fontSize: '0.875rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.75rem' }}
          />
          <button onClick={runAI} disabled={aiLoading || !aiPrompt} style={{ width: '100%', padding: '0.6rem', background: '#8b6914', color: '#fff', border: 'none', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: aiLoading ? 'not-allowed' : 'pointer', opacity: aiLoading ? 0.7 : 1, marginBottom: '1rem' }}>
            {aiLoading ? 'Generating…' : 'Generate'}
          </button>
          {aiSuggestion && (
            <>
              <div style={{ padding: '0.75rem', background: '#111', border: '1px solid rgba(139,105,20,0.4)', fontSize: '0.875rem', color: '#faf8f4', wordBreak: 'break-all', marginBottom: '0.75rem' }}>
                {aiSuggestion}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={applyAI} style={{ flex: 1, padding: '0.55rem', background: '#2a5c3f', color: '#fff', border: 'none', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Apply & Save
                </button>
                <button onClick={() => setAiSuggestion('')} style={{ flex: 1, padding: '0.55rem', background: 'transparent', color: '#555', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Discard
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

      {/* Image replace modal */}
      {imgModal && (
        <Modal onClose={() => setImgModal(null)}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#faf8f4', marginBottom: '1rem' }}>Replace Image</h3>
          {imgUrl && (
            <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden', marginBottom: '0.75rem', background: '#111' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <p style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Image URL</p>
          <input
            type="text"
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-…"
            style={{ width: '100%', padding: '0.6rem 0.75rem', background: '#111', border: '1px solid rgba(255,255,255,0.12)', color: '#faf8f4', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.75rem' }}
          />
          <p style={{ fontSize: '0.68rem', color: '#555', marginBottom: '1rem', lineHeight: 1.5 }}>
            Tip: find photos at <a href="https://unsplash.com" target="_blank" rel="noreferrer" style={{ color: '#8b6914' }}>unsplash.com</a>, open a photo, right-click the image → Copy image address.
          </p>
          <button onClick={applyImage} style={{ width: '100%', padding: '0.6rem', background: '#8b6914', color: '#fff', border: 'none', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Apply & Save
          </button>
        </Modal>
      )}
    </>
  )
}

function pillBtn(bg: string): React.CSSProperties {
  return { padding: '0.45rem 0.85rem', background: bg, color: '#faf8f4', border: 'none', fontSize: '0.7rem', letterSpacing: '0.06em', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }
}

function MenuItem({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.6rem 0.85rem', background: hover ? '#2a2a2a' : 'none', border: 'none', color: '#faf8f4', fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer' }}
    >
      <span style={{ fontSize: '0.9rem' }}>{icon}</span> {label}
    </button>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '520px', padding: '1.75rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#555', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        {children}
      </div>
    </div>
  )
}
