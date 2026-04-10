import type { CollectionConfig } from 'payload'

export const Produtos: CollectionConfig = {
  slug: 'produtos',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'preco', 'imagemUrl', 'linkAfiliado'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Generate slug from titulo if not provided
        if (data.titulo && !data.slug) {
          data.slug = data.titulo
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título do Produto',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      admin: {
        description: 'URL amigável. Ex: kit-ferramentas-46-pecas (gerado automaticamente se vazio)',
      },
    },
    {
      name: 'preco',
      type: 'number',
      required: true,
      label: 'Preço (R$)',
      admin: {
        description: 'Preço em reais, sem símbolo. Ex: 89.90',
      },
    },
    {
      name: 'linkAfiliado',
      type: 'text',
      required: true,
      label: 'Link de Afiliado',
      admin: {
        description: 'URL completa do link de afiliado da Shopee',
      },
    },
    {
      name: 'imagemUrl',
      type: 'text',
      label: 'URL da Imagem',
      admin: {
        description: 'URL da imagem do produto (Vercel Blob ou URL direta)',
      },
    },
    {
      name: 'categoria',
      type: 'select',
      options: [
        { label: 'Camisetas', value: 'camisetas' },
        { label: 'Bermudas', value: 'bermudas' },
        { label: 'Tênis', value: 'tenis' },
        { label: 'Acessórios', value: 'acessorios' },
        { label: 'Suplementos', value: 'suplementos' },
        { label: 'Equipamentos', value: 'equipamentos' },
      ],
      label: 'Categoria',
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição do produto (para SEO)',
      },
    },
  ],
}
