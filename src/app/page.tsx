import { getProducts } from '@/actions/getProducts'
import { productsPage } from '@/consts/dict'
import { type NextSearchParams } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface ProductsPageProps {
  searchParams: NextSearchParams<typeof productsPage.searchParams.page>
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const page = Number((await searchParams)[productsPage.searchParams.page])

  // If there's any search parameter (page === NaN | 0), redirects to the page with default search param (1)
  if (!page) redirect(`/?page=1`)

  const products = await getProducts(page)

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul className="grid grid-cols-3 justify-items-center">
        {products.data.map((product) => (
          <li key={product.id}>
            {product.id}
            <Link href={`/product/${product.id}`}>Buy</Link>
          </li>
        ))}
      </ul>
      <Link
        aria-disabled={products.previous.disabled}
        className={products.previous.disabled ? 'pointer-events-none' : ''}
        href={{
          pathname: '/',
          query: { [productsPage.searchParams.page]: page - 1 },
        }}>
        Previous
      </Link>
      <Link
        aria-disabled={products.next.disabled}
        className={products.next.disabled ? 'pointer-events-none' : ''}
        href={{
          pathname: '/',
          query: { [productsPage.searchParams.page]: page + 1 },
        }}>
        Next
      </Link>
    </div>
  )
}
