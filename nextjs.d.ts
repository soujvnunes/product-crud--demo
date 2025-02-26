import 'next'

declare module 'next' {
  export type NextParams<K extends string> = Promise<{
    [Keys in K]?: string
  }>

  export type NextSearchParams<K extends string> = Promise<{
    [Keys in K]?: string | string[]
  }>
}
