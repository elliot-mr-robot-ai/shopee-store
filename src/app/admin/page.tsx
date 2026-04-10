import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Dashboard - Shopee Store</h1>
      
      <div style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
        <Link 
          href="/admin/collections/produtos"
          style={{ 
            padding: '1rem', 
            background: '#f0f0f0', 
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333'
          }}
        >
          📦 Produtos ({process.env.NEXT_PUBLIC_SERVER_URL})
        </Link>
        
        <Link 
          href="/admin/collections/media"
          style={{ 
            padding: '1rem', 
            background: '#f0f0f0', 
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333'
          }}
        >
          🖼️ Média
        </Link>
        
        <Link 
          href="/admin/collections/users"
          style={{ 
            padding: '1rem', 
            background: '#f0f0f0', 
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333'
          }}
        >
          👥 Usuários
        </Link>
        
        <Link 
          href="/"
          style={{ 
            padding: '1rem', 
            background: '#e0e0e0', 
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333',
            marginTop: '2rem'
          }}
        >
          🏠 Ver Loja
        </Link>
      </div>
    </div>
  )
}
