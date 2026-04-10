import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import '../../../(frontend)/styles.css'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })
  
  const result = await payload.find({
    collection: 'produtos',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!result.docs[0]) {
    return { title: 'Produto não encontrado' }
  }

  const produto = result.docs[0]
  const title = `${produto.titulo} | Loja Fitness`
  const description = produto.descricao || `Compre ${produto.titulo} com o melhor preço!链接 de afiliado.`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: produto.imagemUrl ? [produto.imagemUrl] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: produto.imagemUrl ? [produto.imagemUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })
  
  const result = await payload.find({
    collection: 'produtos',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!result.docs[0]) {
    notFound()
  }

  const produto = result.docs[0] as any

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>🏋️ Loja Fitness</h1>
        <p>Produtos de academia com os melhores preços</p>
      </header>

      <nav className="breadcrumb">
        <a href="/">← Voltar para loja</a>
      </nav>

      <article className="product-detail">
        <div className="product-detail-image">
          {produto.imagemUrl ? (
            <img src={produto.imagemUrl} alt={produto.titulo} />
          ) : (
            <div className="image-placeholder">📦</div>
          )}
        </div>

        <div className="product-detail-info">
          {produto.categoria && (
            <span className="product-category">{produto.categoria}</span>
          )}
          
          <h2 className="product-detail-title">{produto.titulo}</h2>
          
          <span className="product-detail-price">
            R$ {typeof produto.preco === 'number' 
              ? produto.preco.toFixed(2).replace('.', ',') 
              : produto.preco}
          </span>

          {produto.descricao && (
            <p className="product-detail-description">{produto.descricao}</p>
          )}

          <a
            href={produto.linkAfiliado}
            target="_blank"
            rel="noopener noreferrer"
            className="product-detail-button"
          >
            🛒 Comprar na Shopee
          </a>

          <p className="product-detail-disclaimer">
           * Ao clicar no botão você será redirecionado para a Shopee. 
            Como afiliado, posso receber uma commission por compras realizadas.
          </p>
        </div>
      </article>

      <footer className="store-footer">
        <p>💬 Cadastre produtos via Telegram — @ElliotBot</p>
      </footer>
    </div>
  )
}
