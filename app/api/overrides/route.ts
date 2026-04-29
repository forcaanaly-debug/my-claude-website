import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { verifyToken } from '@/lib/admin/auth'

const PATH = join(process.cwd(), 'data/overrides.json')

type Override = { selector: string; type: 'text' | 'src'; value: string }
type Overrides = Record<string, Override[]>

function read(): Overrides {
  try { return JSON.parse(readFileSync(PATH, 'utf-8')) } catch { return {} }
}

export async function GET() {
  return NextResponse.json(read())
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { pathname, selector, type, value } = await req.json()
  if (!pathname || !selector || !type || value === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const data = read()
  if (!data[pathname]) data[pathname] = []
  const existing = data[pathname].find(o => o.selector === selector)
  if (existing) { existing.value = value; existing.type = type }
  else data[pathname].push({ selector, type, value })
  writeFileSync(PATH, JSON.stringify(data, null, 2))
  return NextResponse.json({ ok: true })
}
