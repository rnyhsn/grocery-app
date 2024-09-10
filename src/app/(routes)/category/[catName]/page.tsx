import CategoryList from '@/components/body/home/CategoryList';
import PopularProduct from '@/components/body/home/PopularProduct';
import { getProductsByCategory } from '@/utils/apis/product';
import React from 'react'

const CategoryProductPage = async ({params}: {params: {catName: string}}) => {
    // console.log(params.catName);
    let catName = params.catName.replaceAll("%20", " ");
    catName = catName.replaceAll("%26", "&");
    // console.log(catName);
    const products = await getProductsByCategory(catName);
    console.log(products);
  return (
    <div>
      {/* {params.catName} */}
      <h1 className="text-3xl text-white font-bold py-5 bg-primary text-center">
        {catName}
      </h1>
      <div>
        <CategoryList categoryName={catName} />
      </div>
      <PopularProduct categoryName={catName} />
    </div>
  )
}

export default CategoryProductPage
