import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Loja de afiliados Shopee - Produtos de academia',
  title: 'Loja Fitness | Afiliados Shopee',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
