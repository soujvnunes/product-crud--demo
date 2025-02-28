'use server'

import { type Product } from './getProduct'

interface GetProductsArgs {
  page: number
  category?: string
}

export async function getProducts({ page, category }: GetProductsArgs) {
  const { API_BASE_URL, API_PRODUCTS_PATH } = process.env
  // I'm fetching 12 per time instead of all of the available data.
  const limitBase = 12
  // I'm adding plus one to check if there're more data available.
  const offset = 1
  // The actual limit will be increased according to the current page.
  const limit = limitBase * page
  const categoryPath = category ? `/category/${category}` : ''

  if (!API_BASE_URL || !API_PRODUCTS_PATH) {
    throw new Error('Missing API variables')
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${API_PRODUCTS_PATH}${categoryPath}?limit=${
        limit + offset
      }`,
    )

    if (!response.ok) {
      throw new Error('Error getting products')
    }

    const products: Product[] = await response.json()
    // Since I've fetched data with the limit value base plus one,
    // I'm subtracting it to keep the actual rendered data lenght.
    const productsLength = products.length - offset

    return {
      // The available data will be sliced by the range between
      // current page and available data length.
      data: products.slice(
        (page - 1) * limitBase,
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
        disabled: page - 1 <= 0 || undefined,
      },
    }
  } catch (error) {
    throw error
  }
}
