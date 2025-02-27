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
      const currentCategory = params.get(productsPage.searchParams.category)
      const isAllCategory = value === ALL_CATEGORY

      // I don't want to trigger a rerender on the search params
      // if user clicks on 'all' without any category listed.
      if (!currentCategory && isAllCategory) return

      let newParams = ''

      if (isAllCategory) {
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
