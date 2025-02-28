'use client'

import { useCallback, useTransition } from 'react'
import Button from './ui/Button'
import { deleteProduct } from '@/actions/deleteProduct'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from './ui/Dialog'
import { Loader2 } from 'lucide-react'
import { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ProductRemoveProps = React.ComponentProps<'button'> &
  Pick<LinkProps, 'href'>

export default function ProductRemove({ href, ...props }: ProductRemoveProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const id = +event.currentTarget.value

      startTransition(async () => {
        try {
          const deleted = await deleteProduct(id)

          if (!deleted) {
            toast.error('Failed to remove product')
            return
          }

          if (typeof href === 'string') {
            toast.warning('Unexpected error. Try Again')
            return
          }

          const queries = Object.entries(href.query ?? {}).reduce(
            (acc, [key, value]) => {
              if (typeof value === 'string' || typeof value === 'number') {
                acc[key] = typeof value === 'number' ? String(value) : value
              }

              return acc
            },
            {} as Record<string, string>,
          )
          const queryString = new URLSearchParams(queries).toString()

          toast.success('Product removed')
          router.push(`${href.pathname}?${queryString}`)
        } catch (error) {
          toast.warning(
            error instanceof Error ? error.message : 'Unknown error. Try Again',
          )
        }
      })
    },
    [href, router],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="ml-auto mr-2"
          variant="destructive"
          {...props}>
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remove product</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove it?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button type="button">No</Button>
          </DialogClose>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleDelete}>
            {isPending && <Loader2 className="animate-spin" />}
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
