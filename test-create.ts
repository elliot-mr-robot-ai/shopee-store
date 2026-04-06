import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function test() {
  const payload = await getPayload({ config: configPromise })
  
  const result = await payload.create({
    collection: 'produtos',
    data: {
      titulo: 'Caneta Teste Freio',
      preco: 29.90,
      linkAfiliado: 'https://br.shp.ee/amFiYw7g',
      categoria: 'acessorios',
      imagemUrl: 'https://9uify6tcneax9wou.public.blob.vercel-storage.com/caneta-teste-freio.webp',
    },
  })
  
  console.log('Created:', JSON.stringify(result, null, 2))
  process.exit(0)
}

test().catch(e => {
  console.error('Error:', e.message)
  process.exit(1)
})
