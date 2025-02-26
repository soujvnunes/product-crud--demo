import { getProducts } from '@/actions/getProducts'
import { type NextSearchParams } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface HomeProps {
  searchParams: NextSearchParams<typeof searchParams.page>
}

export default async function Home(props: HomeProps) {
  const page = Number((await props.searchParams)[searchParams.page])

  // If there's any search parameter (page === NaN | 0), redirects to the page with default search param (1)
  if (!page) redirect(`/?page=1`)

  const products = await getProducts(page)
  const hasPrevious = page - 1 > 0

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
        aria-disabled={!hasPrevious || undefined}
        className={!hasPrevious ? 'pointer-events-none' : ''}
        href={{
          pathname: '/',
          query: { [searchParams.page]: page - 1 },
        }}>
        Previous
      </Link>
      <Link
        aria-disabled={!products.hasNext || undefined}
        className={!products.hasNext ? 'pointer-events-none' : ''}
        href={{
          pathname: '/',
          query: { [searchParams.page]: page + 1 },
        }}>
        Next
      </Link>
    </div>
  )
}

// Dictionary for the search params
const searchParams = {
  page: 'page',
} as const
