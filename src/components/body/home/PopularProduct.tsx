import React from 'react'
import ProductCard from './ProductCard'
import { getProducts, getProductsByCategory } from '@/utils/apis/product'

const PopularProduct = async ({categoryName}: {categoryName?: string}) => {
    const products = categoryName ? await getProductsByCategory(categoryName) : await getProducts();
    
  return (
    <div className="mx-4 md:mx-8 lg:mx-16">
      <h1 className="text-2xl font-semibold text-primary mb-5">Popular Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {
            products.map((product: any, index: number) => (
                <ProductCard product={product} key={index} />
            ))
        }
       
      </div>
    </div>
  )
}

export default PopularProduct
