import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Product CRUD',
  description: 'Create, read, update and remove products from your store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full`}>
      <body className="bg-neutral-50 text-neutral-950 h-full">{children}</body>
    </html>
  )
}
