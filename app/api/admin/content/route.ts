import { NextRequest, NextResponse } from 'next/server'
import { getContent, writeContent } from '@/lib/content'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getContent())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  writeContent(body)
  revalidatePath('/', 'layout')
  return NextResponse.json({ ok: true })
}
