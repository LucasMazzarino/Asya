'use client'
import React from 'react'
import { useState } from 'react'
import { PRODUCT_CATEGORIES } from '@/config'


interface FilterProductsProps {
  onFilterSelect: (filter: string | null) => void;
}

const FilterProducts: React.FC<FilterProductsProps> = ({ onFilterSelect }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value === '' ? null : event.target.value
    setActiveFilter(selectedFilter)
    onFilterSelect(selectedFilter)
  }

  return (
    <select
      value={activeFilter || ''}
      onChange={handleFilterChange}
      className='text-black bg-white border border-black rounded-2xl p-2 w-40 md:w-60'
    >
      <option value=''>Todas las categorías</option>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <option key={index} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  )
}

export default FilterProducts
