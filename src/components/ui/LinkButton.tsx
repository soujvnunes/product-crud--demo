import { type VariantProps } from 'class-variance-authority'
import Link, { type LinkProps } from 'next/link'
import { buttonVariants } from './Button'
import { cn } from '@/lib/utils'

type LinkButtonProps = LinkProps &
  Omit<React.ComponentProps<'a'>, keyof LinkProps> &
  VariantProps<typeof buttonVariants>

export default function LinkButton({
  disabled,
  size,
  variant,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      aria-disabled={!!disabled}
      className={cn(buttonVariants({ disabled, size, variant, className }))}
      {...props}
    />
  )
}
