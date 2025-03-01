import { Product } from '@/actions/getProduct'
import ProductImage, { type ProductImageProps } from './ProductImage'
import LinkButton from './ui/LinkButton'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { productPage } from '@/consts/dict'
import { type ParsedUrlQueryInput } from 'querystring'

interface ProductProps
  extends Omit<Product, 'category' | 'image'>,
    Omit<ProductImageProps, 'id' | 'title'> {
  compact?: boolean
  query: ParsedUrlQueryInput
}

export default function ProductCard({
  title,
  price,
  rating,
  id,
  compact,
  query,
  ...props
}: ProductProps) {
  return (
    <div className="space-y-2">
      <ProductImage {...props} />
      <div>
        <p className="flex gap-2 items-center justify-between font-medium">
          <span className="truncate">{title}</span>
          <strong>${price}</strong>
        </p>
        <p
          className={cn('flex h-8 items-center', {
            'text-sm': compact,
          })}>
          {compact ? (
            <>
              <span className="bg-yellow-500/60 flex h-6 text-xs font-bold items-center px-2 mr-2 rounded-sm gap-1">
                {rating.rate} <StarIcon className="size-4" />
              </span>
              {rating.count} reviews
            </>
          ) : (
            <span className="text-sm">
              <strong>{rating.rate} stars</strong> from {rating.count} reviews
            </span>
          )}
          <LinkButton
            size="sm"
            className="shrink-0 ml-auto"
            href={{
              pathname: `${productPage.pathname}/${id}`,
              query,
            }}>
            Manage
          </LinkButton>
        </p>
      </div>
    </div>
  )
}
