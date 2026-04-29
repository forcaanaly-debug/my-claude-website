import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' })

const SYSTEM = `You are an expert editor for a luxury travel website called Silk Route Expeditions.
When given a piece of content (text, image URL, color, etc.) and an instruction, return ONLY the new value — no explanation, no quotes, just the raw replacement value.
For image requests, return a valid Unsplash CDN URL in the format: https://images.unsplash.com/photo-{numeric-id}?w=1200&q=85
For color requests, return a valid hex color code.
For text requests, match the tone: elegant, precise, literary — befitting a luxury travel brand.`

export async function POST(req: NextRequest) {
  const { prompt, context, field, provider } = await req.json()

  if (provider === 'gemini') {
    const key = process.env.GEMINI_API_KEY
    if (!key) return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 400 })

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents: [{ parts: [{ text: `Field: ${field}\nCurrent value: ${context}\nInstruction: ${prompt}` }] }],
        }),
      }
    )
    const data = await res.json()
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    return NextResponse.json({ result })
  }

  // Default: Claude
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 400 })
  }

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system: SYSTEM,
    messages: [{ role: 'user', content: `Field: ${field}\nCurrent value: ${context}\nInstruction: ${prompt}` }],
  })

  const result = (message.content[0] as { type: string; text: string }).text.trim()
  return NextResponse.json({ result })
}
