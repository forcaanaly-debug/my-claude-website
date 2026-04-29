'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', background: '#242424', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8b6914', marginBottom: '0.5rem' }}>
            Silk Route Expeditions
          </p>
          <h1 style={{ fontFamily: 'serif', fontSize: '1.75rem', fontWeight: 300, color: '#faf8f4', letterSpacing: '-0.02em' }}>
            Admin
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.4rem' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#faf8f4', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.4rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem 0.85rem', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.12)', color: '#faf8f4', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          {error && (
            <p style={{ fontSize: '0.8rem', color: '#e05555', textAlign: 'center' }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#8b6914', color: '#faf8f4', border: 'none', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
