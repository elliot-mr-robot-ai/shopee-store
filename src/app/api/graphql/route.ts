import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import configPromise from '../../../../payload.config'

export const POST = async (req: NextRequest) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await req.json()
    
    const result = await payload.graphQL({
      schema: undefined,
      req,
      query: body.query,
      variables: body.variables,
    })
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('GraphQL Error:', error)
    return NextResponse.json({ errors: [{ message: error.message }] }, { status: 500 })
  }
}
