'use client'

import { Product } from '../payload-type'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSlider from './ImageSlider'

interface ProductListingProps {
  product: Product | null
  index: number
  userType?: string | null
}

const ProductListing = ({
  product,
  index,
  userType
}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) => {
      const imageUrl = typeof image === 'string' ? image : image?.url
      return imageUrl ? imageUrl.replace('http://localhost:3000/media/', 'https://asya.uy/') : ''
    })
    .filter(Boolean) as string[]

  if (isVisible && product) {
    return (
      <Link
      className={cn(
        'invisible h-full w-full cursor-pointer group/main',
        {
          'visible animate-in fade-in-5': isVisible,
        }
      )}
      href={`/product/${product.id}`}>
      <div className='flex flex-col h-full w-full border border-gray-500 rounded-lg shadow-md bg-gray-500'>
        <ImageSlider urls={validUrls} />
        <div className="flex flex-col justify-between flex-grow p-2">
          <div className='flex flex-col justify-between flex-grow'>
            <h2 className='font-medium text-sm text-white'>
              {product.name}
            </h2>
            <p className='mt-1 text-sm text-slate-300'>
              {label}
            </p>
          </div>
          {userType === 'Wholesale' ? (
            <div>
              <p className='mt-1 font-medium text-sm text-white line-through'>
                {formatPrice(product.price)}
              </p>
              <p className='mt-1 font-medium text-sm text-white'>
                {formatPrice(product.wholesalePrice)}
              </p>
            </div>
          ) : (
            <p className='mt-1 font-medium text-white'>
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default ProductListing