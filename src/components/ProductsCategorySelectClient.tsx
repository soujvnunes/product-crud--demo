'use client'

import { productsPage } from '@/consts/dict'
import { Select } from './ui/Select'
import Button from './ui/Button'
import { XIcon } from 'lucide-react'
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
    <div className="inline-flex items-center space-x-2 h-12 pl-1.5 px-2 rounded-xl bg-white">
      <Select
        value={category || ''}
        onValueChange={searchParams.change}
        {...props}>
        {children}
        <Button
          size="icon"
          variant="outline"
          aria-label="Reset category filter"
          disabled={!searchParams.get()}
          onClick={searchParams.delete}>
          <XIcon />
        </Button>
      </Select>
    </div>
  )
}
