import { type Product } from '@/actions/getProduct'

export default function filterProductsByRate(products: Product[]) {
  const favorites: Product[] = []
  const data: Product[] = []

  for (const product of products) {
    if (product.rating.rate > 4.5) favorites.push(product)
    else data.push(product)
  }

  return {
    favorites: favorites.sort((a, b) => b.rating.rate - a.rating.rate),
    data,
  }
}
