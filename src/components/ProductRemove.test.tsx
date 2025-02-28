import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { toast } from 'sonner'
import ProductRemove from './ProductRemove'
import { deleteProduct } from '@/actions/deleteProduct'

jest.mock('@/actions/deleteProduct', () => ({ deleteProduct: jest.fn() }))
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), warning: jest.fn(), error: jest.fn() },
}))
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('ProductRemove', () => {
  let mockPush: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockPush = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockPush,
    })
  })

  it('should open the confirmation dialog when clicking remove button', () => {
    render(<ProductRemove href={{ pathname: '/products' }} />)
    fireEvent.click(screen.getByText('Remove'))
    expect(
      screen.getByText('Are you sure you want to remove it?'),
    ).toBeInTheDocument()
  })

  it('should call deleteProduct and show success message on success', async () => {
    ;(deleteProduct as jest.Mock).mockResolvedValue(true)
    render(<ProductRemove href={{ pathname: '/products' }} />)

    fireEvent.click(screen.getByText('Remove'))
    fireEvent.click(screen.getByText('Yes'))

    await waitFor(() => expect(deleteProduct).toHaveBeenCalled())
    expect(toast.success).toHaveBeenCalledWith('Product removed')
    expect(mockPush).toHaveBeenCalledWith('/products?')
  })

  it('should show error toast if deleteProduct fails', async () => {
    ;(deleteProduct as jest.Mock).mockResolvedValue(false)
    render(<ProductRemove href={{ pathname: '/products' }} />)

    fireEvent.click(screen.getByText('Remove'))
    fireEvent.click(screen.getByText('Yes'))

    await waitFor(() => expect(deleteProduct).toHaveBeenCalled())
    expect(toast.error).toHaveBeenCalledWith('Failed to remove product')
  })

  it('should show warning toast on unexpected error', async () => {
    ;(deleteProduct as jest.Mock).mockRejectedValue(
      new Error('Unexpected error'),
    )
    render(<ProductRemove href={{ pathname: '/products' }} />)

    fireEvent.click(screen.getByText('Remove'))
    fireEvent.click(screen.getByText('Yes'))

    await waitFor(() => expect(deleteProduct).toHaveBeenCalled())
    expect(toast.warning).toHaveBeenCalledWith('Unexpected error')
  })
})
