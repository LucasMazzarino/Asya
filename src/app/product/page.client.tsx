'use client'
import React, { useState } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import FilterProducts from '@/components/FilterProducts';
import ProductReel from '../../components/ProductsReel';
import { TQueryValidator } from '@/lib/validators/query-validator';
import { User } from '@/payload-type';
import { Search } from 'lucide-react';


const ProductFilterPage = ({ user }: { user: User | null }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  const productReelQuery: TQueryValidator = {
    sort: 'asc',
    limit: 20,
    ...(activeFilter && { category: activeFilter }), 
  };

  return (
    <MaxWidthWrapper className='bg-background'>
      <div className='flex flex-col md:flex-row items-center justify-between mt-36 mb-4 md:mb-0'>
        <h1 className='text-3xl text-white font-bold'>Nuestros Productos</h1>
        <div className='flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0'>
          <FilterProducts onFilterSelect={handleFilterChange} />
          <div className='relative flex items-center w-full md:w-60'>
            <input
              type='text'
              placeholder='Buscar productos...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='text-black bg-white w-full px-4 py-2 border border-black rounded-2xl pr-10'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <Search className='h-5 w-5 text-black' />
            </div>
          </div>
        </div>
      </div>
      <ProductReel
        user={user}
        query={productReelQuery}
        searchQuery={searchQuery}
        activeFilter={activeFilter}
      />
    </MaxWidthWrapper>
  )
}

export default ProductFilterPage;