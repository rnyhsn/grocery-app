import { LayoutGrid, Search, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { getCategories } from '@/utils/apis/category'
import Link from 'next/link'
import AuthBtn from './AuthBtn'
import CartCounter from './CartCounter'


 

const Header = async () => {

  const categories = await getCategories();


  return (
    <div className="flex justify-between h-20 items-center px-4 sm:px-8 lg:px-20 shadow-md">
      {/* Left side section */}
      <div className="flex items-center gap-8">
        <Link href="/">
        <Image src="/logo.png" alt="" className="" width={150} height={70} />
        </Link>
        <div className="hidden gap-4 items-center md:flex">
            {/* Category Dropdown */}
          
            <DropdownMenu>
            <DropdownMenuTrigger asChild>  
                <div className="flex items-center gap-2 cursor-pointer px-6 py-2 bg-slate-300 rounded-full">
                <LayoutGrid size="20px" />
                <span >Category</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                {
                  categories.map((category: any) => (
                    <DropdownMenuItem key={category.attributes.name} className="cursor-pointer hover:font-semibold flex items-center gap-2"> 
                      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.attributes.icon.data.attributes.url} alt="" width={24} height={24} />
                      {category.attributes.name} 
                    </DropdownMenuItem>
                  ))
                }
                
            </DropdownMenuContent>
            </DropdownMenu>
            {/* Search Box */}
            <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-full">
            <Search />
            <input type="text" placeholder="Search Here..." className="outline-none" />
            </div>
        </div>
      </div>
      {/* Right Side Section */}
      <div className="flex items-center gap-4">
        <CartCounter />
        <AuthBtn />
      </div>
    </div>
  )
}

export default Header
