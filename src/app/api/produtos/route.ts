import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { titulo, preco, linkAfiliado, categoria, imagemUrl } = body

    const payload = await getPayload({ config: configPromise })

    const result = await payload.create({
      collection: 'produtos',
      draft: false,
      data: {
        titulo,
        preco,
        linkAfiliado,
        categoria,
        imagemUrl,
      },
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Error creating produto:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'produtos',
      pagination: false,
      depth: 1,
    })
    return NextResponse.json({ success: true, data: result.docs })
  } catch (error: any) {
    console.error('Error fetching produtos:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
