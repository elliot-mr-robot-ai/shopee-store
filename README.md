# 🛒 Shopee Store - Loja de Afiliados

Loja automática de produtos de academia via Shopee, com cadastro via agente IA no Telegram.

## Stack
- **CMS:** Payload v3 (Next.js App Router)
- **Banco:** Neon PostgreSQL (free tier)
- **Deploy:** Vercel
- **Frontend:** Next.js com Tailwind-like CSS

## Fluxo
1. Você envia link da Shopee no Telegram
2. Agente Elliot extrai título, foto, preço
3. Cadastra automaticamente via API
4. Frontend exibe cards → clique redireciona pro link afiliado

## Setup Local

```bash
# 1. Copie as variáveis de ambiente
cp .env.example .env

# 2. Preencha PAYLOAD_SECRET e DATABASE_URL no .env

# 3. Instale dependências (use pnpm)
pnpm install

# 4. Rode migrações do banco
pnpm payload migrate

# 5. Inicie em dev
pnpm dev
```

## Deploy no Vercel

1. Fork/copie este repo pro seu GitHub
2. Crie conta no [Neon](https://neon.tech) e crie um banco PostgreSQL
3. conecte o repo ao Vercel
4. Adicione as env vars:
   - `PAYLOAD_SECRET`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SERVER_URL` (URL do Vercel após deploy)
5. Deploy! 🚀

## Endpoints da API

| Método | Path | Descrição |
|--------|------|-----------|
| GET | `/api/produtos` | Lista todos os produtos |
| POST | `/api/produtos` | Cadastra produto |
| GET | `/api/produtos/[id]` | Busca produto por ID |

## Admin Panel

Acesse `/admin` para gerenciar produtos manualmente.
