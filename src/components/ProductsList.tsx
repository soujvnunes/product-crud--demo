import { getProducts } from '@/actions/getProducts'
import { productsPage } from '@/consts/dict'
import Image from 'next/image'
import Link from 'next/link'
import LinkButton from './ui/LinkButton'

interface ProductsListProps {
  page: number
  category?: string
}

export default async function ProductsList({
  page,
  category,
}: ProductsListProps) {
  const products = await getProducts({ page, category })

  return (
    <>
      <ul className="grid grid-cols-3 gap-4 justify-items-center">
        {products.data.map((product) => (
          <li
            className="w-full"
            key={product.id}>
            <div className="relative h-64">
              <Image
                fill
                alt=""
                priority
                className="object-contain"
                sizes="(min-width: 808px) 50vw, 100vw"
                src={product.image}
              />
            </div>
            <div>
              <p className="font-semibold truncate">{product.title}</p>
              <p className="text-sm">
                <strong>{product.category}</strong>
              </p>
            </div>
            <Link
              href={{
                pathname: `/product/${product.id}`,
                query: {
                  [productsPage.searchParams.page]: page,
                  category,
                },
              }}>
              Buy
            </Link>
          </li>
        ))}
      </ul>
      <LinkButton
        disabled={products.previous.disabled}
        href={{
          pathname: '/',
          query: {
            [productsPage.searchParams.page]: page - 1,
            category,
          },
        }}>
        Previous
      </LinkButton>
      <LinkButton
        disabled={products.next.disabled}
        href={{
          pathname: '/',
          query: {
            [productsPage.searchParams.page]: page + 1,
            category,
          },
        }}>
        Next
      </LinkButton>
    </>
  )
}
