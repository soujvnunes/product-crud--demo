'use server'

export async function deleteProduct(id: number) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}${process.env.API_PRODUCTS_PATH}/${id}`,
      {
        method: 'DELETE',
      },
    )

    return response.ok
  } catch (error) {
    throw error
  }
}
