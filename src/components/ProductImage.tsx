import Image, { type ImageProps } from 'next/image'

export type ProductImageProps = Omit<ImageProps, 'alt'>

export default function ProductImage(props: Omit<ImageProps, 'alt'>) {
  return (
    <div className="relative h-64 bg-white border-8 border-white rounded-2xl outline-input outline">
      <Image
        fill
        priority
        className="object-contain"
        alt=""
        {...props}
      />
    </div>
  )
}
