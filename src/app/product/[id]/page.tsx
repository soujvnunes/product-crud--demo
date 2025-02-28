import { type NextParams } from 'next'
import { getProduct } from '@/actions/getProduct'
import { getProducts } from '@/actions/getProducts'
import { productPage, productsPage } from '@/consts/dict'
import { type ProductsPageProps } from '@/app/page'
import ProductImage from '@/components/ProductImage'
import LinkButton from '@/components/ui/LinkButton'
import { ArrowLeft } from 'lucide-react'
import ProductRemove from '@/components/ProductRemove'

interface ProductPageProps extends ProductsPageProps {
  params: NextParams<typeof productPage.params.id>
}

export async function generateStaticParams() {
  // TODO: get page using cookies
  const products = await getProducts({ page: 1 })

  return products.data.map((product) => ({ id: String(product.id) }))
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { page, ...queries } = await searchParams
  const id = Number((await params)[productPage.params.id])
  const product = await getProduct(id)

  const sanitizedDescription = product.description.split(/\. +/)
  const href = {
    pathname: productsPage.pathname,
    query: {
      [productsPage.searchParams.page]: Number(page),
      ...queries,
    },
  }

  return (
    <main className="max-w-5xl px-4 lg:px-8 mx-auto">
      <header className="flex h-16 items-center">
        <LinkButton
          variant="ghost"
          href={href}>
          <ArrowLeft />
          Back
        </LinkButton>
        <h2 className="font-semibold truncate mr-2">{product.title}</h2>
        <ProductRemove
          href={href}
          value={id}
        />
      </header>
      <div className="grid lg:grid-cols-2 gap-4">
        <ProductImage
          sizes="(min-width: 808px) 50vw, 100vw"
          src={product.image}
        />
        <div className="space-y-4">
          <p className="space-y-2">
            <strong className="text-xs block uppercase mb-2">
              Description
            </strong>
            {sanitizedDescription.map((sentence, index) => (
              <span
                className="block"
                key={sentence}>
                {sentence}
                {sanitizedDescription.length - 1 !== index && '.'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </main>
  )
}
