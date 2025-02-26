import { type NextParams } from 'next'
import { getProduct } from '@/actions/getProduct'
import PreviousPage from '@/components/PreviousPage'
import { getProducts } from '@/actions/getProducts'
import { productPage } from '@/consts/dict'

interface ProductPageProps {
  params: NextParams<typeof productPage.params.id>
}

export async function generateStaticParams() {
  // TODO: get page using cookies
  const products = await getProducts(1)

  return products.data.map(({ id }) => ({ id: String(id) }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = Number((await params)[productPage.params.id])
  const product = await getProduct(id)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <PreviousPage />
      {product.title}
    </div>
  )
}
