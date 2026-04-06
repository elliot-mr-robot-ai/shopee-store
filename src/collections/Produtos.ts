import type { CollectionConfig } from 'payload'

export const Produtos: CollectionConfig = {
  slug: 'produtos',
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'preco', 'imagem', 'linkAfiliado'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título do Produto',
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
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem do Produto',
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
  ],
}
