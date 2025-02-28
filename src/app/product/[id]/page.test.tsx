import { render, screen } from '@testing-library/react'
import { getProduct } from '@/actions/getProduct'
import { getProducts } from '@/actions/getProducts'
import { productPage } from '@/consts/dict'
import '@testing-library/jest-dom'
import ProductPage, { ProductPageProps } from './page'

jest.mock('@/actions/getProduct', () => ({
  getProduct: jest.fn(),
}))
jest.mock('@/actions/getProducts', () => ({
  getProducts: jest.fn(),
}))
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('ProductPage', () => {
  const mockProduct = {
    id: 1,
    title: 'Title',
    description: 'Description.',
    image: '/image.jpg',
  }

  beforeEach(() => {
    ;(getProduct as jest.Mock).mockResolvedValue(mockProduct)
    ;(getProducts as jest.Mock).mockResolvedValue({
      data: [{ id: 1 }, { id: 2 }],
    })
  })

  it('renders product details', async () => {
    render(
      await ProductPage({
        params: new Promise((resolve) =>
          resolve({ [productPage.params.id]: '1' }),
        ),
        searchParams: new Promise((resolve) => resolve({ page: '1' })),
      }),
    )

    expect(await screen.findByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByAltText('')).toBeInTheDocument()
  })
})
