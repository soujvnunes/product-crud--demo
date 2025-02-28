import { render, screen, waitFor } from '@testing-library/react'
import ProductsList from '@/components/ProductsList'
import { getProducts } from '@/actions/getProducts'
import filterProductsByRate from '@/helpers/filterProductsByRate'
import sortProducts from '@/helpers/sortProducts'
import { redirect } from 'next/navigation'

jest.mock('@/actions/getProducts')
jest.mock('@/helpers/filterProductsByRate')
jest.mock('@/helpers/sortProducts')
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

describe('ProductsList', () => {
  const mockProducts = {
    data: [
      { id: 1, title: 'Product 1', image: '/img1.jpg', price: 10, rating: 5 },
      { id: 2, title: 'Product 2', image: '/img2.jpg', price: 20, rating: 4 },
    ],
    previous: { disabled: false },
    next: { disabled: false },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getProducts as jest.Mock).mockResolvedValue(mockProducts)
    ;(sortProducts as jest.Mock).mockReturnValue(mockProducts)
    ;(filterProductsByRate as jest.Mock).mockReturnValue({
      data: [mockProducts.data[0]],
      favorites: [mockProducts.data[1]],
    })
  })

  it('fetches and displays products', async () => {
    render(await ProductsList({ page: 1 }))

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledWith({ page: 1 })
    })

    expect(await screen.findByText('Product 1')).toBeInTheDocument()
    expect(await screen.findByText('Product 2')).toBeInTheDocument()
  })

  it('redirects if there are no products on the page', async () => {
    ;(filterProductsByRate as jest.Mock).mockReturnValue({
      data: [],
      favorites: [],
    })

    render(await ProductsList({ page: 2 }))

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/?page=1')
    })
  })

  it('renders favorites section when there are favorites', async () => {
    render(await ProductsList({ page: 1 }))

    expect(await screen.findByText('Favorites')).toBeInTheDocument()
    expect(await screen.findByText('Product 1')).toBeInTheDocument()
  })

  it('renders pagination buttons correctly', async () => {
    render(await ProductsList({ page: 2 }))

    expect(await screen.findByText('Previous')).not.toBeDisabled()
    expect(await screen.findByText('Next')).not.toBeDisabled()
  })
})
