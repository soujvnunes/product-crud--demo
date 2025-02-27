import { productsPage } from '@/consts/dict'
import ProductsFiltersCategory from '@/components/ProductsFiltersCategory'
import ProductsFiltersCategoryClient from '@/components/ProductsFiltersCategoryClient'
import ProductsList from '@/components/ProductsList'
import { type NextParams } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import ProductsFiltersPrice from '@/components/ProductsFiltersPrice'
import { ProductsFiltersSheet } from '@/components/ProductsFiltersSheet'

export interface ProductsPageProps {
  searchParams: NextParams<
    | typeof productsPage.searchParams.page
    | typeof productsPage.searchParams.category
    | typeof productsPage.searchParams.price
  >
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const queries = await searchParams
  const page = Number(queries[productsPage.searchParams.page])

  // If there's any search parameter (page === NaN | 0), redirects to the page with default search param (1)
  if (!page) redirect(`/?page=1`)

  const filters = (
    <>
      <ProductsFiltersPrice price={queries.price} />
      <Suspense fallback="Loading products category selector">
        <ProductsFiltersCategoryClient category={queries.category}>
          <ProductsFiltersCategory />
        </ProductsFiltersCategoryClient>
      </Suspense>
    </>
  )

  return (
    <main className="max-w-5xl px-4 lg:px-8 space-y-2 lg:space-y-4 mx-auto">
      <header className="flex h-16 items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-950/60">Products</h2>
        <ProductsFiltersSheet className="md:hidden">
          <div className="space-x-2 flex mt-4 justify-center">{filters}</div>
        </ProductsFiltersSheet>
        <div className="hidden md:block space-x-2 lg:space-x-4">{filters}</div>
      </header>
      <Suspense fallback="Loading products">
        <ProductsList
          page={page}
          category={queries.category}
          price={queries.price}
        />
      </Suspense>
    </main>
  )
}
