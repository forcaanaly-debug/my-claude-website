'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

interface AIMenuProps {
  onApply: (field: string, value: string) => void
}

interface MenuState {
  x: number
  y: number
  target: HTMLElement | null
}

export default function AIMenu({ onApply }: AIMenuProps) {
  const [menu, setMenu] = useState<MenuState | null>(null)
  const [modal, setModal] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [provider, setProvider] = useState<'claude' | 'gemini'>('claude')
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState('')
  const [field, setField] = useState('')
  const [context, setContext] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement
    const editable = el.closest('[data-field]') as HTMLElement | null
    if (!editable) return
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY, target: editable })
  }, [])

  const closeMenu = useCallback(() => setMenu(null), [])

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', closeMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', closeMenu)
    }
  }, [handleContextMenu, closeMenu])

  function openModal() {
    if (!menu?.target) return
    const f = menu.target.dataset.field ?? ''
    const c = menu.target.dataset.context ?? menu.target.innerText ?? ''
    setField(f)
    setContext(c)
    setMenu(null)
    setSuggestion('')
    setPrompt('')
    setModal(true)
  }

  async function runAI() {
    setLoading(true)
    setSuggestion('')
    const res = await fetch('/api/admin/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, context, field, provider }),
    })
    const data = await res.json()
    setSuggestion(data.result ?? data.error ?? 'No result')
    setLoading(false)
  }

  function applyResult() {
    onApply(field, suggestion)
    setModal(false)
  }

  return (
    <>
      {/* Right-click context menu */}
      {menu && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menu.y,
            left: menu.x,
            background: '#1e1e1e',
            border: '1px solid rgba(255,255,255,0.12)',
            zIndex: 9999,
            minWidth: '180px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <button
            onClick={openModal}
            style={{ display: 'block', width: '100%', padding: '0.7rem 1rem', background: 'none', border: 'none', color: '#faf8f4', textAlign: 'left', fontSize: '0.82rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            ✦ Edit with Claude
          </button>
          <button
            onClick={() => { setProvider('gemini'); openModal() }}
            style={{ display: 'block', width: '100%', padding: '0.7rem 1rem', background: 'none', border: 'none', color: '#faf8f4', textAlign: 'left', fontSize: '0.82rem', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            ✦ Edit with Gemini
          </button>
        </div>
      )}

      {/* AI prompt modal */}
      {modal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setModal(false) }}
        >
          <div style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '560px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#faf8f4', margin: 0 }}>
                Edit with {provider === 'claude' ? 'Claude' : 'Gemini'}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['claude', 'gemini'] as const).map(p => (
                  <button key={p} onClick={() => setProvider(p)} style={{ padding: '0.3rem 0.7rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: provider === p ? '#8b6914' : 'transparent', color: provider === p ? '#fff' : '#6b6b6b', border: '1px solid', borderColor: provider === p ? '#8b6914' : 'rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.4rem' }}>
                Field: {field}
              </p>
              <div style={{ padding: '0.6rem 0.8rem', background: '#111', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.82rem', color: '#9a9a9a', maxHeight: '80px', overflow: 'auto' }}>
                {context}
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the change you want…"
              rows={3}
              style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#111', border: '1px solid rgba(255,255,255,0.12)', color: '#faf8f4', fontSize: '0.875rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.75rem' }}
            />

            <button
              onClick={runAI}
              disabled={loading || !prompt}
              style={{ width: '100%', padding: '0.65rem', background: '#8b6914', color: '#fff', border: 'none', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginBottom: '1rem' }}
            >
              {loading ? 'Generating…' : 'Generate'}
            </button>

            {suggestion && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b6914', marginBottom: '0.4rem' }}>
                  Suggestion
                </p>
                <div style={{ padding: '0.75rem', background: '#111', border: '1px solid rgba(139,105,20,0.3)', fontSize: '0.875rem', color: '#faf8f4', wordBreak: 'break-all' }}>
                  {suggestion}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button
                    onClick={applyResult}
                    style={{ flex: 1, padding: '0.6rem', background: '#2a5c3f', color: '#fff', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setSuggestion('')}
                    style={{ flex: 1, padding: '0.6rem', background: 'transparent', color: '#6b6b6b', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
