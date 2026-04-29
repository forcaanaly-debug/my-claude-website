'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import AIMenu from '@/components/admin/AIMenu'
import type { SiteContent, ThemeColors } from '@/lib/content'

const PAGES = ['home', 'about', 'tours', 'destinations', 'services', 'contact', 'gallery'] as const
type PageKey = typeof PAGES[number]

const COLOR_LABELS: Record<keyof ThemeColors, string> = {
  charcoal: 'Background / Dark',
  stone: 'Secondary Text',
  sand: 'Section Background',
  offwhite: 'Light Background',
  bronze: 'Accent / Primary',
  bronzePale: 'Accent Light',
}

export default function AdminPage() {
  const router = useRouter()
  const [content, setContent] = useState<SiteContent | null>(null)
  const [tab, setTab] = useState<'pages' | 'theme' | 'settings'>('pages')
  const [activePage, setActivePage] = useState<PageKey>('home')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/content').then(r => r.json()).then(setContent)
  }, [])

  async function save() {
    if (!content) return
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleAIApply = useCallback((field: string, value: string) => {
    if (!content) return
    setContent(prev => {
      if (!prev) return prev
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent
      const parts = field.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]]
      obj[parts[parts.length - 1]] = value
      return next
    })
  }, [content])

  function updateHero(page: PageKey, key: string, value: string) {
    setContent(prev => {
      if (!prev) return prev
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(next.pages[page] as any).hero[key] = value
      return next
    })
  }

  function updateColor(key: keyof ThemeColors, value: string) {
    setContent(prev => {
      if (!prev) return prev
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent
      next.theme[key] = value
      return next
    })
  }

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
        <p style={{ color: '#6b6b6b', fontSize: '0.85rem' }}>Loading…</p>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hero = ((content.pages as any)[activePage] as { hero: Record<string, string> }).hero

  return (
    <>
      <AIMenu onApply={handleAIApply} />

      {/* Top bar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: '52px', background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: 'serif', fontSize: '0.9rem', color: '#c9a84c', letterSpacing: '0.04em' }}>
            Silk Route — Admin
          </span>
          <span style={{ fontSize: '0.6rem', color: '#3a3a3a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Right-click any field for AI
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/" target="_blank" style={{ fontSize: '0.68rem', color: '#6b6b6b', textDecoration: 'none', letterSpacing: '0.08em' }}>
            View Site ↗
          </a>
          <button
            onClick={save}
            disabled={saving}
            style={{ padding: '0.4rem 1rem', background: saved ? '#2a5c3f' : '#8b6914', color: '#fff', border: 'none', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save All'}
          </button>
          <button onClick={logout} style={{ padding: '0.4rem 0.8rem', background: 'transparent', color: '#6b6b6b', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.65rem', cursor: 'pointer' }}>
            Log out
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
        {/* Sidebar */}
        <nav style={{ width: '200px', flexShrink: 0, background: '#151515', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem 0' }}>
          {(['pages', 'theme', 'settings'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ display: 'block', width: '100%', padding: '0.6rem 1.25rem', background: tab === t ? 'rgba(139,105,20,0.15)' : 'none', border: 'none', borderLeft: tab === t ? '2px solid #8b6914' : '2px solid transparent', color: tab === t ? '#c9a84c' : '#6b6b6b', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'left', cursor: 'pointer' }}
            >
              {t}
            </button>
          ))}

          {tab === 'pages' && (
            <>
              <div style={{ margin: '1rem 1.25rem 0.5rem', height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              {PAGES.map(p => (
                <button
                  key={p}
                  onClick={() => setActivePage(p)}
                  style={{ display: 'block', width: '100%', padding: '0.5rem 1.25rem 0.5rem 1.75rem', background: activePage === p ? 'rgba(255,255,255,0.04)' : 'none', border: 'none', color: activePage === p ? '#faf8f4' : '#555', fontSize: '0.72rem', textAlign: 'left', cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  {p}
                </button>
              ))}
            </>
          )}
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

          {/* PAGES TAB */}
          {tab === 'pages' && (
            <div style={{ maxWidth: '720px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 400, color: '#faf8f4', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                {activePage} page
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#555', marginBottom: '2rem', letterSpacing: '0.06em' }}>
                Right-click any field to edit with Claude or Gemini
              </p>

              {/* Hero image preview + edit */}
              <Section title="Hero Image">
                {hero.imageSrc && (
                  <div style={{ position: 'relative', aspectRatio: '16/6', overflow: 'hidden', marginBottom: '0.75rem', background: '#222' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hero.imageSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <FieldInput
                  label="Image URL"
                  field={`pages.${activePage}.hero.imageSrc`}
                  value={hero.imageSrc ?? ''}
                  context={hero.imageSrc ?? ''}
                  onChange={v => updateHero(activePage, 'imageSrc', v)}
                />
                <FieldInput
                  label="Image Alt Text"
                  field={`pages.${activePage}.hero.imageAlt`}
                  value={hero.imageAlt ?? ''}
                  context={hero.imageAlt ?? ''}
                  onChange={v => updateHero(activePage, 'imageAlt', v)}
                />
              </Section>

              <Section title="Hero Text">
                <FieldInput
                  label="Eyebrow"
                  field={`pages.${activePage}.hero.eyebrow`}
                  value={hero.eyebrow ?? ''}
                  context={hero.eyebrow ?? ''}
                  onChange={v => updateHero(activePage, 'eyebrow', v)}
                />
                <FieldInput
                  label="Heading"
                  field={`pages.${activePage}.hero.heading`}
                  value={hero.heading ?? ''}
                  context={hero.heading ?? ''}
                  onChange={v => updateHero(activePage, 'heading', v)}
                  large
                />
                {hero.subheading !== undefined && (
                  <FieldInput
                    label="Subheading"
                    field={`pages.${activePage}.hero.subheading`}
                    value={hero.subheading ?? ''}
                    context={hero.subheading ?? ''}
                    onChange={v => updateHero(activePage, 'subheading', v)}
                    large
                  />
                )}
              </Section>
            </div>
          )}

          {/* THEME TAB */}
          {tab === 'theme' && (
            <div style={{ maxWidth: '560px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 400, color: '#faf8f4', marginBottom: '0.25rem' }}>Colour Theme</h2>
              <p style={{ fontSize: '0.72rem', color: '#555', marginBottom: '2rem', letterSpacing: '0.06em' }}>
                Changes apply site-wide after saving. Right-click a swatch to edit with AI.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {(Object.keys(COLOR_LABELS) as (keyof ThemeColors)[]).map(key => (
                  <div
                    key={key}
                    data-field={`theme.${key}`}
                    data-context={content.theme[key]}
                    style={{ padding: '1rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                      <div style={{ width: '32px', height: '32px', background: content.theme[key], border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8b6914', margin: 0 }}>
                          {COLOR_LABELS[key]}
                        </p>
                        <p style={{ fontSize: '0.72rem', color: '#9a9a9a', margin: 0 }}>{key}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={content.theme[key]}
                        onChange={e => updateColor(key, e.target.value)}
                        style={{ width: '36px', height: '28px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={content.theme[key]}
                        onChange={e => updateColor(key, e.target.value)}
                        style={{ flex: 1, padding: '0.35rem 0.5rem', background: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#faf8f4', fontSize: '0.78rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {tab === 'settings' && (
            <div style={{ maxWidth: '480px' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 400, color: '#faf8f4', marginBottom: '0.25rem' }}>Settings</h2>
              <p style={{ fontSize: '0.72rem', color: '#555', marginBottom: '2rem', letterSpacing: '0.06em' }}>
                Configure AI providers in your .env.local file
              </p>

              {[
                { label: 'ANTHROPIC_API_KEY', hint: 'Required for Claude AI editing' },
                { label: 'GEMINI_API_KEY', hint: 'Required for Gemini AI editing' },
                { label: 'ADMIN_USERNAME', hint: 'Login username' },
                { label: 'ADMIN_PASSWORD', hint: 'Login password' },
                { label: 'ADMIN_SECRET', hint: 'Session signing secret (change this!)' },
              ].map(({ label, hint }) => (
                <div key={label} style={{ marginBottom: '1rem', padding: '0.85rem 1rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#c9a84c', margin: '0 0 0.2rem' }}>{label}</p>
                  <p style={{ fontSize: '0.72rem', color: '#555', margin: 0 }}>{hint}</p>
                </div>
              ))}

              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '0.7rem', color: '#8b6914', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>HOW TO USE THE AI MENU</p>
                <p style={{ fontSize: '0.78rem', color: '#9a9a9a', lineHeight: 1.7, margin: 0 }}>
                  On the Pages or Theme tabs, right-click (two-finger tap on trackpad) any text field or colour swatch. Choose &ldquo;Edit with Claude&rdquo; or &ldquo;Edit with Gemini&rdquo;, type your instruction, and hit Generate. Review the suggestion and click Apply to update the field.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

/* ── Sub-components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8b6914', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {children}
      </div>
    </div>
  )
}

function FieldInput({ label, field, value, context, onChange, large = false }: {
  label: string
  field: string
  value: string
  context: string
  onChange: (v: string) => void
  large?: boolean
}) {
  return (
    <div data-field={field} data-context={context} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <label style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>
        {label}
      </label>
      {large ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          style={{ padding: '0.55rem 0.75rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', color: '#faf8f4', fontSize: '0.875rem', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ padding: '0.55rem 0.75rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', color: '#faf8f4', fontSize: '0.875rem', outline: 'none' }}
        />
      )}
    </div>
  )
}
