'use client'

import { productsPage } from '@/consts/dict'
import useEnhancedSearchParams from '@/hooks/useEnhancedSearchParams'
import { ArrowUp01, ArrowUp10 } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './ui/ToggleGroup'
import ProductsFiltersReset from './ProductsFiltersReset'

interface ProductsFiltersPriceProps {
  price?: string
}

export default function ProductsFiltersPrice({
  price,
}: ProductsFiltersPriceProps) {
  const priceQuery = useEnhancedSearchParams(productsPage.searchParams.price)

  return (
    <ProductsFiltersReset query={priceQuery}>
      <ToggleGroup
        variant="outline"
        type="single"
        onValueChange={priceQuery.change}
        value={price || ''}>
        <ToggleGroupItem
          value="asc"
          aria-label="Toggle ascendent">
          <ArrowUp01 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="desc"
          aria-label="Toggle descendent">
          <ArrowUp10 className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </ProductsFiltersReset>
  )
}
