'use client'

import { productsPage } from '@/consts/dict'
import {
  ALL_CATEGORY,
  type AllProductCategory,
} from '@/helpers/getAllCategories'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Select } from './ui/Select'

interface ProductsCategorySelectClientProps {
  children: React.ReactNode
  category?: string
}

export default function ProductsCategorySelectClient({
  category,
  ...props
}: ProductsCategorySelectClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const handleValueChange = useCallback(
    (value: AllProductCategory) => {
      const params = new URLSearchParams(searchParams.toString())
      let newParams = ''

      if (value === ALL_CATEGORY) {
        params.delete(productsPage.searchParams.category)
        newParams = ''
      } else {
        params.set(productsPage.searchParams.category, value)
        newParams = `?${params.toString()}`
      }

      router.push(pathname + newParams)
    },
    [pathname, router, searchParams],
  )

  return (
    <Select
      onValueChange={handleValueChange}
      value={category}
      {...props}
    />
  )
}
