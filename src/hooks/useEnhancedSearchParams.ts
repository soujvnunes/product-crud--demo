'use client'

import { useMemo, useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function useEnhancedSearchParams<N extends string>(name: N) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  )

  const handlePush = useCallback(() => {
    return router.push(`${pathname}?${params.toString()}`)
  }, [params, pathname, router])
  const handleDelete = useCallback(() => {
    params.delete(name)
    handlePush()
  }, [handlePush, name, params])
  const handleChange = useCallback(
    (value: string) => {
      params.set(name, value)
      handlePush()
    },
    [handlePush, name, params],
  )
  const handleGet = useCallback(() => {
    return params.get(name)
  }, [name, params])

  return {
    delete: handleDelete,
    change: handleChange,
    get: handleGet,
  }
}
