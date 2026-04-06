import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const produtos = await payload.find({
    collection: 'produtos',
    pagination: false,
    depth: 1,
  })

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>🏋️ Loja Fitness</h1>
        <p>Produtos de academia com os melhores preços</p>
      </header>

      {produtos.docs.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum produto cadastrado ainda.</p>
          <p>Envie um link da Shopee no Telegram e o agente Elliot cadastra automaticamente! 🚀</p>
        </div>
      ) : (
        <div className="product-grid">
          {produtos.docs.map((produto: any) => (
            <a
              key={produto.id}
              href={produto.linkAfiliado}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card"
            >
              <div className="product-image">
                {produto.imagem?.url ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${produto.imagem.url}`}
                    alt={produto.titulo}
                    width={300}
                    height={300}
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="image-placeholder">📦</div>
                )}
              </div>
              <div className="product-info">
                <span className="product-category">{produto.categoria}</span>
                <h3 className="product-title">{produto.titulo}</h3>
                <span className="product-price">R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
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
