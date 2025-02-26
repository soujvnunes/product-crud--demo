import { type NextParams } from 'next'
import { getProduct } from '@/actions/getProduct'

interface ProductPageProps {
  params: NextParams<'id'>
}
export default async function ProductPage({ params }: ProductPageProps) {
  const id = Number((await params).id)
  const product = await getProduct(id)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {product.title}
    </div>
  )
}
