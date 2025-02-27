import { type Product } from '@/actions/getProduct'

interface SortProductsArgs {
  products: Product[]
  byPrice?: string
}

export default function sortProducts(args: SortProductsArgs) {
  if (!args.byPrice) return args.products

  return args.products.sort((a, b) => {
    if (args.byPrice === 'asc') return a.price - b.price

    return b.price - a.price
  })
}
