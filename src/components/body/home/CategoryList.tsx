import { getCategories } from '@/utils/apis/category'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CategoryList = async ({categoryName}: {categoryName?: string}) => {
    
    const categories =  await getCategories();
    
  return (
    <div className="flex flex-col gap-5 mx-4 sm:mx-8 md:mx-16">
      <h2 className="text-2xl font-semibold text-primary">Shop by Category</h2>
      <div className={!categoryName ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4" : "flex gap-4 justify-between overflow-x-auto"}>
        {
            categories.map((category: any) => (
                <Link href={`/category/${category.attributes.name}`} className={`bg-green-50 cursor-pointer px-4 py-6 rounded-md flex flex-col gap-2 items-center justify-center group hover:bg-green-300 ${categoryName===category.attributes.name && "bg-green-300"} ${categoryName && "xl:w-1/7 lg:w-1/6  md:w-1/4 w-1/2 shrink-0"}`} key={category.attributes.name}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.attributes.icon.data.attributes.url} alt="" width={48} height={48} className="group-hover:scale-125 transition-all ease-in-out" />
                    <span className="font-semibold text-primary"> {category.attributes.name} </span>
                </Link>
            ))
        }
    </div>
    </div>
  )
}

export default CategoryList
