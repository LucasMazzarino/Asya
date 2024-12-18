'use client'

import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product, User } from '../payload-type'
import { useState, useEffect } from 'react';
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'


interface ProductReelProps {
  title?: string
  subtitle?: string
  href?: string
  href2?: string
  user?: User | null
  searchQuery?: string
  query: TQueryValidator
  activeFilter?: string | null
}

const FALLBACK_LIMIT = 8

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, href2, user, query, searchQuery, activeFilter } = props

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { data: queryResults, isLoading, hasNextPage, fetchNextPage } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    );
      
  const products = queryResults?.pages.flatMap((page) => page.items) ?? [];

  let map: (Product | null)[] = []
  if (products && products.length) {
    map = products
  } else if (isLoading) {
    map = new Array<null>(
      query.limit ?? FALLBACK_LIMIT
    ).fill(null)
  }

  const type = user?.customerType

  const loadMore = () => {
    fetchNextPage()
  }

  useEffect(() => {
    if (searchQuery !== undefined){
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }
  }, [searchQuery, activeFilter]);


  return (
    <section className='max-md:pr-5 max-md:pl-5 pt-10 pb-14'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl lg:max-w-4xl lg:px-0'>
          {title ? (
            <h2 className='text-2xl font-extrabold text-white sm:text-3xl'>
              {title} 
            </h2>
          ) : null}
          {subtitle ? (
            <p className='mt-2 text-sm text-white'>
              {subtitle}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-orange-500 hover:text-orange-600 md:block'>
            Descargar catálogo termos y mates{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
        {href2 ? (
          <Link
            href={href2}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-orange-500 hover:text-orange-600 md:block'>
            Descargrar catálogo bazar{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className="relative mb-4">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-2 gap-y-5 sm:gap-x-6 md:grid-cols-3 md:gap-y-10 lg:gap-x-8 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.length ? (
              filteredProducts.map((product, i) => (
                <ProductListing
                  userType={type}
                  product={product}
                  index={i}
                  key={`product-${i}`}
                />
              ))
            ) : (
              map.map((product, i) => (
                <ProductListing userType={type} product={product} index={i} key={`product-${i}`} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-10 lg:gap-x-8 lg:grid-cols-4 xl:grid-cols-5'>
            {map.map((product, i ) => (
              <ProductListing userType={type} product={product} index={i} key={`product-${i}`}/>
            ))}
          </div>
        </div>
      </div> */}
      {hasNextPage && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={loadMore}
            className='px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300'
          >
            Cargar más productos
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductReel