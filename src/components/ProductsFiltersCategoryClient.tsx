'use client'

import { productsPage } from '@/consts/dict'
import { Select } from './ui/Select'
import useEnhancedSearchParams from '@/hooks/useEnhancedSearchParams'
import ProductsFiltersRoot from './ProductsFiltersReset'

interface ProductsFiltersCategoryClientProps {
  children: React.ReactNode
  category?: string
}

export default function ProductsFiltersCategoryClient({
  category,
  children,
  ...props
}: ProductsFiltersCategoryClientProps) {
  const categoryQuery = useEnhancedSearchParams(
    productsPage.searchParams.category,
  )

  return (
    <ProductsFiltersRoot query={categoryQuery}>
      <Select
        value={category || ''}
        onValueChange={categoryQuery.change}
        {...props}>
        {children}
      </Select>
    </ProductsFiltersRoot>
  )
}
