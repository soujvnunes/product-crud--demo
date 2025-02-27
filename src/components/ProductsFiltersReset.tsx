import useEnhancedSearchParams from '@/hooks/useEnhancedSearchParams'
import Button from './ui/Button'
import { XIcon } from 'lucide-react'

interface ProductsFiltersResetProps {
  children: React.ReactNode
  query: ReturnType<typeof useEnhancedSearchParams>
}

export default function ProductsFiltersReset({
  children,
  query,
}: ProductsFiltersResetProps) {
  return (
    <div className="inline-flex items-center space-x-2 h-12 pl-1.5 px-2 rounded-xl bg-white">
      {children}
      <Button
        size="icon"
        variant="outline"
        aria-label="Reset filter"
        disabled={!query.get()}
        onClick={query.delete}>
        <XIcon />
      </Button>
    </div>
  )
}
