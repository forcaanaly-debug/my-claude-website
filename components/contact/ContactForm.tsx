'use client'

import { useState } from 'react'

const inputStyle = {
  width: '100%',
  padding: '0.875rem 1rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
  color: 'var(--color-charcoal)',
  background: 'var(--color-offwhite)',
  border: '1px solid rgba(107,107,107,0.25)',
  borderRadius: 0,
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box' as const,
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '0.65rem',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-stone)',
  marginBottom: '0.5rem',
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    destination: '',
    dates: '',
    groupSize: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // Simulate submission
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        padding: '4rem 2rem',
        background: 'var(--color-charcoal)',
        textAlign: 'center',
        border: '1px solid rgba(107,107,107,0.15)',
      }}>
        <div style={{ width: '3rem', height: '1px', background: 'var(--color-bronze)', margin: '0 auto 2rem' }} />
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 300,
          color: 'var(--color-offwhite)',
          marginBottom: '1rem',
          letterSpacing: '-0.01em',
        }}>
          Enquiry Received
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--color-stone)',
          lineHeight: 1.75,
          maxWidth: '340px',
          margin: '0 auto',
        }}>
          Thank you, {form.name.split(' ')[0]}. We will be in touch within 48 hours with a personal response from our team.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Optional"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+44 ..."
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Destination Interest</label>
        <select
          name="destination"
          value={form.destination}
          onChange={handleChange}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
        >
          <option value="">Select a destination...</option>
          <option value="uzbekistan">Uzbekistan</option>
          <option value="pakistan">Pakistan</option>
          <option value="afghanistan">Afghanistan</option>
          <option value="china">China (Silk Road)</option>
          <option value="multi">Multi-country route</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Preferred Travel Dates</label>
          <input
            type="text"
            name="dates"
            value={form.dates}
            onChange={handleChange}
            placeholder="e.g. Oct 2025"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Group Size</label>
          <select
            name="groupSize"
            value={form.groupSize}
            onChange={handleChange}
            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          >
            <option value="">Select...</option>
            <option value="1-2">1–2 people</option>
            <option value="3-4">3–4 people</option>
            <option value="5-8">5–8 people</option>
            <option value="9+">9+ people</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Your Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us about your interests, what kind of experience you're looking for, any specific sites or activities that matter to you..."
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '120px',
          }}
        />
      </div>

      <div style={{ paddingTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={sending}
          className="btn btn-bronze"
          style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}
        >
          {sending ? 'Sending...' : 'Send Enquiry'}
        </button>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          color: 'var(--color-stone)',
          marginTop: '0.75rem',
          lineHeight: 1.6,
        }}>
          Your enquiry will be sent to{' '}
          <a href="mailto:forcaan@gmail.com" style={{ color: 'var(--color-bronze)', textDecoration: 'none' }}>forcaan@gmail.com</a>.
          {' '}We take your privacy seriously. Your information is used solely to respond to your enquiry and is never shared with third parties.
        </p>
      </div>
    </form>
  )
}
