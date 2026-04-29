'use client'
import { useEffect, useState } from 'react'

type Override = { selector: string; type: 'text' | 'src'; value: string }
type Overrides = Record<string, Override[]>

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] ?? null
}

function getSelectorPath(el: Element): string {
  const parts: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = el
  while (node && node !== document.body) {
    const tag = (node as Element).tagName.toLowerCase()
    const parentEl: Element | null = (node as Element).parentElement
    if (!parentEl) break
    const same = Array.from(parentEl.children).filter(c => c.tagName === (node as Element).tagName)
    const idx = same.indexOf(node as Element) + 1
    parts.unshift(same.length > 1 ? `${tag}:nth-of-type(${idx})` : tag)
    node = parentEl
  }
  return parts.join(' > ')
}

// Apply saved overrides to the DOM (runs for all visitors)
async function applyPageOverrides() {
  try {
    const res = await fetch('/api/overrides')
    if (!res.ok) return
    const all: Overrides = await res.json()
    const list = all[window.location.pathname] ?? []
    list.forEach(({ selector, type, value }) => {
      try {
        const el = document.querySelector(selector) as HTMLElement | null
        if (!el) return
        if (type === 'text') {
          el.innerHTML = value
        } else if (type === 'src') {
          const img = el as HTMLImageElement
          img.src = value
          img.removeAttribute('srcset')
        }
      } catch { /* selector mismatch — ignore */ }
    })
  } catch { /* network error — ignore */ }
}

export default function LiveEditor() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; el: HTMLElement; kind: 'text' | 'image' } | null>(null)
  const [imgModal, setImgModal] = useState<{ el: HTMLElement; src: string } | null>(null)
  const [imgUrl, setImgUrl] = useState('')
  const [aiModal, setAiModal] = useState<{ el: HTMLElement; value: string; kind: 'text' | 'image' } | null>(null)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiProvider, setAiProvider] = useState<'claude' | 'gemini'>('claude')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')
  const [showTheme, setShowTheme] = useState(false)
  const [colors, setColors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // Apply overrides on mount for all visitors
  useEffect(() => { applyPageOverrides() }, [])

  // Detect admin
  useEffect(() => { if (getCookie('admin_ui') === '1') setIsAdmin(true) }, [])

  // Edit-mode highlight CSS
  useEffect(() => {
    const id = '__le-css'
    let s = document.getElementById(id) as HTMLStyleElement | null
    if (!s) { s = document.createElement('style'); s.id = id; document.head.appendChild(s) }
    s.textContent = editMode ? `
      body.le-active :is(h1,h2,h3,h4,h5,h6,p,li,span,a,td,th,figcaption,caption,blockquote):not(#__le *):not(nav *) {
        outline: 1px dashed rgba(139,105,20,.4) !important;
        cursor: text !important;
        transition: outline .1s, background .1s;
      }
      body.le-active :is(h1,h2,h3,h4,h5,h6,p,li,span,a,td,th,figcaption,caption,blockquote):not(#__le *):not(nav *):hover {
        outline: 1px solid #c9a84c !important;
        background: rgba(139,105,20,.06) !important;
      }
      body.le-active img:not(#__le *) {
        outline: 2px dashed rgba(139,105,20,.55) !important;
        cursor: pointer !important;
      }
      body.le-active img:not(#__le *):hover {
        outline: 2px solid #c9a84c !important;
        opacity: .88;
      }
      [contenteditable=true]:not(#__le *) {
        outline: 2px solid #c9a84c !important;
        background: rgba(139,105,20,.09) !important;
        min-width: 2px;
      }
    ` : ''
    if (editMode) document.body.classList.add('le-active')
    else document.body.classList.remove('le-active')
  }, [editMode])

  // Click + right-click handlers
  useEffect(() => {
    if (!editMode) return

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('#__le')) return

      // Image click → replace modal
      const imgEl = (t.tagName === 'IMG' ? t : t.closest('img')) as HTMLImageElement | null
      if (imgEl) {
        e.preventDefault(); e.stopPropagation()
        setImgModal({ el: imgEl, src: imgEl.currentSrc || imgEl.src })
        setImgUrl(imgEl.currentSrc || imgEl.src)
        return
      }

      // Text click → inline edit (prefer block-level parent)
      const textEl = (
        t.closest('h1,h2,h3,h4,h5,h6,p,li,td,th,blockquote,figcaption') ??
        t.closest('span,a')
      ) as HTMLElement | null
      if (!textEl || textEl.closest('nav') || textEl.closest('#__le')) return
      if (textEl.contentEditable === 'true') return

      e.preventDefault(); e.stopPropagation()
      const orig = textEl.innerHTML
      textEl.contentEditable = 'true'
      textEl.focus()
      // Move caret to end
      const sel = window.getSelection()
      if (sel) { const r = document.createRange(); r.selectNodeContents(textEl); r.collapse(false); sel.removeAllRanges(); sel.addRange(r) }

      const commit = () => {
        textEl.contentEditable = 'false'
        if (textEl.innerHTML !== orig) saveOverride(textEl, 'text', textEl.innerHTML)
        textEl.removeEventListener('blur', commit)
        textEl.removeEventListener('keydown', onKey)
      }
      const onKey = (ke: KeyboardEvent) => {
        if (ke.key === 'Escape') { textEl.innerHTML = orig; textEl.contentEditable = 'false'; textEl.removeEventListener('blur', commit); textEl.removeEventListener('keydown', onKey) }
        if (ke.key === 'Enter' && !ke.shiftKey && textEl.tagName !== 'LI') { ke.preventDefault(); textEl.blur() }
      }
      textEl.addEventListener('blur', commit)
      textEl.addEventListener('keydown', onKey)
    }

    const onCtx = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('#__le')) return
      const imgEl = (t.tagName === 'IMG' ? t : t.closest('img')) as HTMLElement | null
      const textEl = (t.closest('h1,h2,h3,h4,h5,h6,p,li,span,a,button,td,th') as HTMLElement | null)
      const el = imgEl ?? textEl
      if (!el || el.closest('nav') || el.closest('#__le')) return
      e.preventDefault()
      setCtxMenu({ x: e.clientX, y: e.clientY, el, kind: imgEl ? 'image' : 'text' })
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('contextmenu', onCtx)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('contextmenu', onCtx)
    }
  }, [editMode])

  // Close ctx menu on outside click
  useEffect(() => {
    if (!ctxMenu) return
    const close = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('#__le')) setCtxMenu(null) }
    setTimeout(() => document.addEventListener('click', close, { once: true }), 50)
  }, [ctxMenu])

  async function saveOverride(el: HTMLElement, type: 'text' | 'src', value: string) {
    const selector = getSelectorPath(el)
    try {
      await fetch('/api/overrides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathname: window.location.pathname, selector, type, value }),
      })
    } catch { /* save failed silently */ }
  }

  async function applyImage() {
    if (!imgModal || !imgUrl.trim()) return
    const img = imgModal.el as HTMLImageElement
    img.src = imgUrl
    img.removeAttribute('srcset')
    await saveOverride(img, 'src', imgUrl)
    showMsg('Image saved')
    setImgModal(null); setImgUrl('')
  }

  async function runAI() {
    if (!aiModal || !aiPrompt.trim()) return
    setAiLoading(true)
    try {
      const r = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, context: aiModal.value, field: aiModal.kind, provider: aiProvider }),
      })
      const d = await r.json()
      setAiResult(d.result || d.error || 'No result')
    } finally { setAiLoading(false) }
  }

  async function applyAI() {
    if (!aiModal || !aiResult) return
    aiModal.el.innerHTML = aiResult
    await saveOverride(aiModal.el, 'text', aiResult)
    showMsg('Applied')
    setAiModal(null); setAiResult(''); setAiPrompt('')
  }

  // Theme
  useEffect(() => {
    if (!showTheme) return
    const cs = getComputedStyle(document.documentElement)
    setColors({
      charcoal: cs.getPropertyValue('--color-charcoal').trim(),
      stone: cs.getPropertyValue('--color-stone').trim(),
      sand: cs.getPropertyValue('--color-sand').trim(),
      offwhite: cs.getPropertyValue('--color-offwhite').trim(),
      bronze: cs.getPropertyValue('--color-bronze').trim(),
      bronzePale: cs.getPropertyValue('--color-bronze-pale').trim(),
    })
  }, [showTheme])

  function liveColor(key: string, val: string) {
    setColors(c => ({ ...c, [key]: val }))
    document.documentElement.style.setProperty(
      key === 'bronzePale' ? '--color-bronze-pale' : `--color-${key}`, val
    )
  }

  async function saveTheme() {
    setSaving(true)
    const r = await fetch('/api/admin/content'); const c = await r.json()
    c.theme = { charcoal: colors.charcoal, stone: colors.stone, sand: colors.sand, offwhite: colors.offwhite, bronze: colors.bronze, bronzePale: colors.bronzePale }
    await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(c) })
    setSaving(false); showMsg('Theme saved')
  }

  function showMsg(m: string) { setMsg(m); setTimeout(() => setMsg(''), 2200) }

  if (!isAdmin) return null

  const colorLabels: Record<string, string> = { charcoal: 'Dark BG', stone: 'Body text', sand: 'Sand BG', offwhite: 'Light BG', bronze: 'Accent', bronzePale: 'Accent light' }

  return (
    <div id="__le" style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', fontFamily: 'var(--font-body)' }}>

      {/* Status hint when editing */}
      {editMode && (
        <div style={{ background: 'rgba(20,20,20,0.93)', border: '1px solid rgba(139,105,20,.35)', borderRadius: '6px', padding: '0.55rem 0.85rem', maxWidth: '280px' }}>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,.65)', margin: 0, lineHeight: 1.6 }}>
            <b style={{ color: '#c9a84c' }}>Click</b> any text to edit it inline<br />
            <b style={{ color: '#c9a84c' }}>Click</b> any image to replace it<br />
            <b style={{ color: '#c9a84c' }}>Right-click</b> anything for AI rewrite
          </p>
        </div>
      )}

      {msg && (
        <div style={{ background: 'rgba(42,92,63,0.95)', borderRadius: '5px', padding: '0.4rem 0.8rem' }}>
          <p style={{ fontSize: '0.7rem', color: '#a8e6bf', margin: 0 }}>✓ {msg}</p>
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Btn onClick={() => setShowTheme(t => !t)} active={showTheme}>🎨 Theme</Btn>
        <Btn onClick={() => setEditMode(m => !m)} active={editMode}>{editMode ? '✓ Editing' : '✏️ Edit Site'}</Btn>
      </div>

      {/* Theme panel */}
      {showTheme && (
        <div style={{ background: '#141414', border: '1px solid rgba(139,105,20,.4)', borderRadius: '8px', padding: '1.2rem', width: '268px', maxHeight: '72vh', overflowY: 'auto' }}>
          <p style={eyebrow}>Site Colours</p>
          {Object.entries(colorLabels).map(([key, label]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <input type="color" value={colors[key] || '#000000'} onChange={e => liveColor(key, e.target.value)}
                style={{ width: '2rem', height: '2rem', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={micro}>{label}</p>
                <input type="text" value={colors[key] || ''} onChange={e => { const v = e.target.value; setColors(c => ({ ...c, [key]: v })); if (/^#[0-9a-fA-F]{6}$/.test(v)) liveColor(key, v) }}
                  style={inputS} />
              </div>
            </div>
          ))}
          <Btn full onClick={saveTheme} disabled={saving}>{saving ? 'Saving…' : 'Save Theme'}</Btn>
        </div>
      )}

      {/* Context menu */}
      {ctxMenu && (
        <div style={{ position: 'fixed', top: ctxMenu.y, left: ctxMenu.x, background: '#141414', border: '1px solid rgba(139,105,20,.5)', borderRadius: '6px', zIndex: 10000, overflow: 'hidden', minWidth: '178px', boxShadow: '0 6px 24px rgba(0,0,0,.6)' }} onClick={e => e.stopPropagation()}>
          {ctxMenu.kind === 'text' ? <>
            <CtxRow onClick={() => {
              const el = ctxMenu.el; setCtxMenu(null)
              const orig = el.innerHTML
              el.contentEditable = 'true'; el.focus()
              const commit = () => { el.contentEditable = 'false'; if (el.innerHTML !== orig) saveOverride(el, 'text', el.innerHTML); el.removeEventListener('blur', commit) }
              el.addEventListener('blur', commit)
            }}>Edit text inline</CtxRow>
            <CtxRow onClick={() => { setAiModal({ el: ctxMenu.el, value: ctxMenu.el.innerText, kind: 'text' }); setCtxMenu(null) }}>✨ Rewrite with AI</CtxRow>
          </> : <>
            <CtxRow onClick={() => {
              const img = ctxMenu.el as HTMLImageElement
              setImgModal({ el: img, src: img.currentSrc || img.src })
              setImgUrl(img.currentSrc || img.src)
              setCtxMenu(null)
            }}>Replace image</CtxRow>
            <CtxRow onClick={() => { setAiModal({ el: ctxMenu.el, value: (ctxMenu.el as HTMLImageElement).alt || 'image', kind: 'image' }); setCtxMenu(null) }}>✨ Suggest image URL</CtxRow>
          </>}
        </div>
      )}

      {/* Image modal */}
      {imgModal && (
        <Modal title="Replace Image" onClose={() => setImgModal(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgUrl || imgModal.src} alt="" style={{ width: '100%', height: '148px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.75rem', display: 'block' }} />
          <p style={micro}>New image URL</p>
          <input type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="https://images.unsplash.com/photo-…" style={{ ...inputS, marginBottom: '0.35rem' }} />
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.5, marginBottom: '1rem' }}>
            Unsplash: open photo → right-click image → Copy image address
          </p>
          <Btn full onClick={applyImage}>Apply &amp; Save</Btn>
        </Modal>
      )}

      {/* AI modal */}
      {aiModal && (
        <Modal title="Edit with AI" onClose={() => { setAiModal(null); setAiResult(''); setAiPrompt('') }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.45)', fontStyle: 'italic', marginBottom: '0.75rem', maxHeight: '52px', overflow: 'hidden', lineHeight: 1.5 }}>
            {aiModal.value.slice(0, 160)}{aiModal.value.length > 160 ? '…' : ''}
          </p>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
            {(['claude', 'gemini'] as const).map(p => (
              <button key={p} onClick={() => setAiProvider(p)} style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: aiProvider === p ? '#fff' : 'rgba(255,255,255,.4)', background: aiProvider === p ? 'rgba(139,105,20,.65)' : 'transparent', border: `1px solid ${aiProvider === p ? 'rgba(139,105,20,.8)' : 'rgba(255,255,255,.15)'}`, borderRadius: '4px', padding: '0.25rem 0.65rem', cursor: 'pointer' }}>
                {p === 'claude' ? '◆ Claude' : '✦ Gemini'}
              </button>
            ))}
          </div>
          <p style={micro}>Instruction</p>
          <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runAI() }} placeholder={`"Make this shorter and more evocative" (⌘↵)`} style={{ ...inputS, height: '76px', resize: 'vertical', marginBottom: '0.75rem' }} />
          <Btn full onClick={runAI} disabled={aiLoading || !aiPrompt.trim()}>{aiLoading ? 'Generating…' : 'Generate'}</Btn>
          {aiResult && (
            <>
              <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(139,105,20,.3)', borderRadius: '4px', padding: '0.65rem', margin: '0.75rem 0', fontSize: '0.82rem', color: 'rgba(255,255,255,.85)', lineHeight: 1.65 }}>
                {aiResult}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Btn full onClick={applyAI}>Apply &amp; Save</Btn>
                <Btn full onClick={() => setAiResult('')}>Discard</Btn>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────

function Btn({ onClick, active, full, disabled, children }: { onClick: () => void; active?: boolean; full?: boolean; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#fff', background: active ? '#8b6914' : '#1a1a1a', border: '1px solid rgba(139,105,20,.5)', borderRadius: '5px', padding: '0.45rem 0.9rem', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1, width: full ? '100%' : 'auto', whiteSpace: 'nowrap', display: 'block' }}>
      {children}
    </button>
  )
}

function CtxRow({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,.88)', background: 'transparent', border: 'none', padding: '0.58rem 0.9rem', cursor: 'pointer' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,105,20,.28)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
      {children}
    </button>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#141414', border: '1px solid rgba(139,105,20,.4)', borderRadius: '10px', padding: '1.5rem', width: '100%', maxWidth: '430px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={eyebrow}>{title}</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const eyebrow: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(139,105,20,1)', margin: '0 0 .85rem' }
const micro: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', margin: '0 0 .3rem' }
const inputS: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#fff', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '5px', padding: '0.45rem 0.7rem', width: '100%', outline: 'none', display: 'block', boxSizing: 'border-box' }
