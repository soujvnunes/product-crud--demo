'use client'

import Button from './ui/Button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/Sheet'

interface ProductsFiltersSheetProps {
  children: React.ReactNode
  className?: string
}

export function ProductsFiltersSheet({
  children,
  ...props
}: ProductsFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          {...props}>
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Filter the products listing by category or sort they items by price.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
