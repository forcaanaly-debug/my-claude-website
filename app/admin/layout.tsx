export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#faf8f4', fontFamily: 'system-ui, sans-serif' }}>
      {children}
    </div>
  )
}
