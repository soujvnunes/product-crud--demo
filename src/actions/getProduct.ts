'use server'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Record<'rate' | 'count', number>
}

export async function getProduct(id: number) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.API_PRODUCTS_PATH}/${id}`,
    )

    if (!response.ok) throw new Error('Error getting product')

    return (await response.json()) as Product
  } catch (error) {
    throw error
  }
}
