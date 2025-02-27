import { productsPage } from '@/consts/dict'
import ProductsList from '@/components/ProductsList'
import { type NextParams } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export interface ProductsPageProps {
  searchParams: NextParams<
    | typeof productsPage.searchParams.page
    | typeof productsPage.searchParams.category
  >
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const queries = await searchParams
  const page = Number(queries[productsPage.searchParams.page])

  // If there's any search parameter (page === NaN | 0), redirects to the page with default search param (1)
  if (!page) redirect(`/?page=1`)

  return (
    <main className="max-w-5xl px-8 space-y-4 mx-auto">
      <Suspense fallback="Loading products">
        <ProductsList
          page={page}
          category={queries.category}
        />
      </Suspense>
    </main>
  )
}
