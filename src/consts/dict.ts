export const productsPage = {
  pathname: '/',
  searchParams: {
    page: 'page',
    category: 'category',
    price: 'price',
  },
} as const

export const productPage = {
  pathname: '/product',
  params: {
    id: 'id',
  },
} as const
