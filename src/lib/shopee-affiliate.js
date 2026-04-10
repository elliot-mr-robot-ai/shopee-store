/**
 * Shopee Affiliate API Client
 * Endpoint: https://open-api.affiliate.shopee.com.br/graphql
 * 
 * Usage:
 *   const result = await generateShortLink('https://shopee.com.br/produto');
 *   console.log(result.shortLink);
 */

const crypto = require('crypto');
const https = require('https');

// Credenciais - AS QUE FUNCIONAM (do n8n)
const APP_ID = '18140380003';
const SECRET = 'ZBHHGBXZQUANLKDQRKZSO4KSAPUVZV7H';

function generateSignature(appId, timestamp, payload, secret) {
  const factor = `${appId}${timestamp}${payload}${secret}`;
  return crypto.createHash('sha256').update(factor).digest('hex');
}

function generateAuthHeader(appId, secret, payload) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(appId, timestamp, payload, secret);
  return {
    auth: `SHA256 Credential=${appId}, Timestamp=${timestamp},Signature=${signature}`,
    timestamp,
    signature
  };
}

function callShopeeAPI(authHeader, payload) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'open-api.affiliate.shopee.com.br',
      port: 443,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Gera link de afiliado shortlink da Shopee
 * @param {string} productUrl - URL do produto Shopee
 * @param {string[]} subIds - IDs opcionais para tracking
 * @returns {Promise<{shortLink: string, originalUrl: string}>}
 */
async function generateShortLink(productUrl, subIds = []) {
  const query = `mutation{
    generateShortLink(input:{originUrl:"${productUrl}",subIds:${JSON.stringify(subIds)}}){
      shortLink
    }
  }`;

  const payload = JSON.stringify({ query });
  const { auth } = generateAuthHeader(APP_ID, SECRET, payload);
  
  const result = await callShopeeAPI(auth, payload);
  
  if (result.errors) {
    throw new Error(`Shopee API Error: ${result.errors[0].message}`);
  }
  
  return result.data.generateShortLink;
}

// Teste
if (require.main === module) {
  const testUrl = 'https://shopee.com.br/Apple-Iphone-11-128GB-Local-Set-i.52377417.6309028319';
  
  console.log('Gerando short link para:', testUrl);
  
  generateShortLink(testUrl, ['test'])
    .then(result => {
      console.log('✅ Sucesso!');
      console.log('Short Link:', result.shortLink);
    })
    .catch(err => {
      console.error('❌ Erro:', err.message);
    });
}

module.exports = { generateShortLink };
