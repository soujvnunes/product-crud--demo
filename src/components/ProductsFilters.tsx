import { Suspense } from 'react'
import ProductsFiltersPrice from './ProductsFiltersPrice'
import ProductsFiltersCategoryClient from './ProductsFiltersCategoryClient'
import ProductsFiltersCategory from './ProductsFiltersCategory'

interface ProductsFiltersProps extends React.ComponentProps<'div'> {
  category?: string
  price?: string
}

export default function ProductsFilters({
  price,
  category,
  ...props
}: ProductsFiltersProps) {
  return (
    <div {...props}>
      <ProductsFiltersPrice price={price} />
      <Suspense fallback="Loading products category selector">
        <ProductsFiltersCategoryClient category={category}>
          <ProductsFiltersCategory />
        </ProductsFiltersCategoryClient>
      </Suspense>
    </div>
  )
}
