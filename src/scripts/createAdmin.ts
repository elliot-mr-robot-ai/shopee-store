import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function createAdmin() {
  const payload = await getPayload({ config: configPromise })
  
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@shopee-store.com',
      password: 'Admin@123456',
    },
  })
  
  console.log('✅ Admin criado!')
  console.log('   Email: admin@shopee-store.com')
  console.log('   Senha: Admin@123456')
  process.exit(0)
}

createAdmin().catch(console.error)
