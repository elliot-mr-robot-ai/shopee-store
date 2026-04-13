import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { titulo, preco, linkAfiliado, categoria, imagemUrl } = body

    if (!titulo || !preco || !linkAfiliado) {
      return NextResponse.json({ 
        success: false, 
        error: 'titulo, preco e linkAfiliado sao obrigatorios' 
      }, { status: 400 })
    }

    const slug = generateSlug(titulo)

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
    
    await client.connect()

    const result = await client.query(
      `INSERT INTO produtos (titulo, slug, preco, link_afiliado, categoria, imagem_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, titulo, slug, preco`,
      [titulo, slug, preco, linkAfiliado, categoria || null, imagemUrl || null]
    )

    await client.end()

    return NextResponse.json({ 
      success: true, 
      data: result.rows[0] 
    })
  } catch (error: any) {
    console.error('POST Error:', error.message)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slugFilter = searchParams.get('slug')
    
    let query = `SELECT id, titulo, slug, preco, link_afiliado as "linkAfiliado", 
              categoria, imagem_url as "imagemUrl", 
              created_at as "createdAt" 
       FROM produtos`
    const params: any[] = []
    
    if (slugFilter) {
      query += ` WHERE slug = $1`
      params.push(slugFilter)
    }
    
    query += ` ORDER BY created_at DESC`

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
    
    await client.connect()

    const result = await client.query(query, params)

    await client.end()

    return NextResponse.json({ 
      success: true, 
      data: result.rows 
    })
  } catch (error: any) {
    console.error('GET Error:', error.message)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}