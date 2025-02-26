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
      hasNext: products.length > limit,
    }
  } catch (error) {
    throw error
  }
}
