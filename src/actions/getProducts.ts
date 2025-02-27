import { type Product } from './getProduct'

export async function getProducts(currentPage: number) {
  // I'm fetching 12 per time instead of all of the available data.
  const limitBase = 12
  // I'm adding plus one to check if there're more data available.
  const offset = 1
  // The actual limit will be increased according to the current page.
  const limit = limitBase * currentPage

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.API_PRODUCTS_PATH}?limit=${
        limit + offset
      }`,
    )

    if (!response.ok) throw new Error('Error getting products')

    const products: Product[] = await response.json()
    // Since I've fetched data with the limit value base plus one,
    // I'm subtracting it to keep the actual rendered data lenght.
    const productsLength = products.length - offset

    return {
      // The available data will be sliced by the range between
      // current page and available data length.
      data: products.slice(
        (currentPage - 1) * limitBase,
        productsLength < limit ? limit : productsLength,
      ),
      // This helps me keeping track of more data.
      // Example for page 1: [13].slice(1, 12), meaning that there're
      // more data to be fetched as I'm rendering just 12 of 13 items.
      next: {
        // Also, since this is being used mainly for a11y purposes,
        // I prefer to not render false value as it's unnecessary for
        // screen readers. Example: It's better to have disabled="true"
        // and not disabled="false" otherwise, just any disabled
        // attribute at all.
        disabled: products.length <= limit || undefined,
      },
      previous: {
        // If I subtracted the current page by 1 and it's zero or less,
        // users will not be able to fetch any data since they're on
        // the very first page.
        disabled: currentPage - 1 <= 0 || undefined,
      },
    }
  } catch (error) {
    throw error
  }
}
