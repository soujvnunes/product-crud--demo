import { getProducts } from '@/actions/getProducts'
import Link from 'next/link'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul className="grid grid-cols-3 justify-items-center">
        {products.map((product) => (
          <li key={product.id}>
            {product.id}
            <Link href={`/product/${product.id}`}>Buy</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
