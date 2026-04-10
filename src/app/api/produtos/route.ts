import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Body received:', JSON.stringify(body))
    
    // Simple response without DB for testing
    return NextResponse.json({ 
      success: true, 
      message: 'Rota funcionando!',
      received: body
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'GET funcionando!'
  })
}
