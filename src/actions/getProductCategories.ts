'use server'

export type ProductCategory =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing"

export async function getProductCategories() {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.API_PRODUCTS_PATH}/categories`,
    )

    if (!response.ok) throw new Error('Error getting product categories')

    return (await response.json()) as ProductCategory[]
  } catch (error) {
    throw error
  }
}
