import { type Product } from './getProduct'

export async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.API_PRODUCTS_PATH}`,
    )

    if (!response.ok) throw new Error('Error getting products')

    return (await response.json()) as Product[]
  } catch (error) {
    throw error
  }
}
