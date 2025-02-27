'use client'

import { productsPage } from '@/consts/dict'
import { Select } from './ui/Select'
import useEnhancedSearchParams from '@/hooks/useEnhancedSearchParams'

interface ProductsCategorySelectClientProps {
  children: React.ReactNode
  category?: string
}

export default function ProductsCategorySelectClient({
  category,
  children,
  ...props
}: ProductsCategorySelectClientProps) {
  const searchParams = useEnhancedSearchParams(
    productsPage.searchParams.category,
  )

  return (
    <Select
      value={category || ''}
      onValueChange={searchParams.change}
      {...props}>
      {children}
    </Select>
  )
}
