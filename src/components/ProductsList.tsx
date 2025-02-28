import { getProducts } from '@/actions/getProducts'
import { productsPage } from '@/consts/dict'
import LinkButton from './ui/LinkButton'
import { StarIcon } from 'lucide-react'
import sortProducts from '@/helpers/sortProducts'
import filterProductsByRate from '@/helpers/filterProductsByRate'
import { redirect } from 'next/navigation'
import ProductCard from './ProductCard'
import { type Product } from '@/actions/getProduct'

interface ProductsListProps {
  page: number
  category?: string
  price?: string
}

export default async function ProductsList({
  page,
  category,
  price,
}: ProductsListProps) {
  const products = await getProducts({ page, category })
  const sortedProducts = sortProducts({
    products: products.data,
    byPrice: price,
  })
  const filteredProducts = filterProductsByRate(sortedProducts)

  // If there's no data available for this page, it probably went to the previous one
  if (!filteredProducts.data.length) {
    const params = new URLSearchParams()

    if (category) params.set('category', category)
    if (price) params.set('price', price)

    const queryString = params.toString()

    redirect(`/?page=${page - 1}${queryString ? `&${queryString}` : ''}`)
  }

  const query = {
    price,
    category,
  }

  function productCardProps({ image, ...product }: Product) {
    return {
      ...product,
      src: image,
      query: {
        [productsPage.searchParams.page]: page,
        ...query,
      },
    }
  }

  return (
    <>
      <section
        className="bg-yellow-500/60 py-2 rounded-xl"
        hidden={!filteredProducts.favorites.length}>
        <h3 className="text-xl mx-3 gap-2 mb-2 font-semibold flex items-center">
          <StarIcon className="size-6" />
          Favorites
        </h3>
        <ul className="flex flex-nowrap px-4 overflow-x-auto gap-4">
          {filteredProducts.favorites.map((product) => (
            <li
              className="w-5/6 md:w-2/5 flex-none"
              key={product.id}>
              <ProductCard
                sizes="(min-width: 808px) 50vw, 100vw"
                {...productCardProps(product)}
              />
            </li>
          ))}
        </ul>
      </section>
      <p
        aria-live="polite"
        className="font-semibold">
        {!filteredProducts.data.length && 'No items available on this page.'}
      </p>
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 justify-items-center"
        hidden={!filteredProducts.data.length}>
        {filteredProducts.data.map((product) => (
          <li
            className="w-full"
            key={product.id}>
            <ProductCard
              sizes="(min-width: 808px) 50vw, 100vw"
              {...productCardProps(product)}
            />
          </li>
        ))}
      </ul>
      <footer className="w-full flex justify-end gap-2 pb-2">
        <LinkButton
          disabled={products.previous.disabled}
          href={{
            pathname: productsPage.pathname,
            query: {
              [productsPage.searchParams.page]: page - 1,
              ...query,
            },
          }}>
          Previous
        </LinkButton>
        <LinkButton
          disabled={products.next.disabled}
          href={{
            pathname: productsPage.pathname,
            query: {
              [productsPage.searchParams.page]: page + 1,
              ...query,
            },
          }}>
          Next
        </LinkButton>
      </footer>
    </>
  )
}
