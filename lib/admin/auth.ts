const SECRET = process.env.ADMIN_SECRET ?? 'dev-secret'

export async function signToken(payload: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
  return btoa(JSON.stringify({ payload, sig: sigB64 }))
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const { payload, sig: sigB64 } = JSON.parse(atob(token))
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false, ['verify']
    )
    const sigBytes = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0))
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload))
  } catch {
    return false
  }
}
