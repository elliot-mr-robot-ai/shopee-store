import React from 'react'
import './styles.css'

export const dynamic = 'force-dynamic'

async function getProdutos() {
  try {
    const res = await fetch('https://shopee-store-six.vercel.app/api/produtos', {
      next: { revalidate: 0 }
    })
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching produtos:', error)
    return []
  }
}

export default async function HomePage() {
  const produtos = await getProdutos()

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>🏋️ Loja Fitness</h1>
        <p>Produtos de academia com os melhores preços</p>
      </header>

      {produtos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum produto cadastrado ainda.</p>
          <p>Envie um link da Shopee no Telegram e o agente Elliot cadastra automaticamente! 🚀</p>
        </div>
      ) : (
        <div className="product-grid">
          {produtos.map((produto: any) => (
            <a
              key={produto.id}
              href={`/produto/${produto.slug || produto.id}`}
              className="product-card"
            >
              <div className="product-image">
                {produto.imagemUrl ? (
                  <img src={produto.imagemUrl} alt={produto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="image-placeholder">📦</div>
                )}
              </div>
              <div className="product-info">
                <span className="product-category">{produto.categoria}</span>
                <h3 className="product-title">{produto.titulo}</h3>
                <span className="product-price">
                  R$ {typeof produto.preco === 'number' ? produto.preco.toFixed(2).replace('.', ',') : produto.preco}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      <footer className="store-footer">
        <p>💬 Cadastre produtos via Telegram — @ElliotBot</p>
      </footer>
    </div>
  )
}