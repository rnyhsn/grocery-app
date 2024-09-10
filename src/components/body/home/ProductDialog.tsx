"use client"
import { Button } from '@/components/ui/button'
import { addToCart } from '@/utils/apis/cart';
import { Loader, ShoppingBasket } from 'lucide-react';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


const ProductDialog = ({product, productId}: {product: any, productId: number}) => {
    
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user') as string);
    // console.log(user);
    if(!jwt) {
        redirect("/login");
    }

    const [itemCount, setItemCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState<number>(product.sellingPrice || product.price)
    const [loading, setLoading] = useState(false);
    const handleCartSubmit = async () => {
        setLoading(true);
        const info = {
            quantity: itemCount,
            amount: totalPrice,
            productId,
            userId: user.id
            
        }
        const resp = await addToCart(info, jwt);
        // console.log(resp);
        if(resp.success) {
            setLoading(false);
            toast(resp.message);
        }
        
    }

    useEffect(()=> {
        setTotalPrice(itemCount * (product.sellingPrice || product.price));
    }, [itemCount]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
      <div className="w-full h-[300px] relative bg-gray-200">
        <Image className="object-contain" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images.data[0].attributes.url} alt="" fill />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold"> {product.name}  ({product.itemQuantityType}) </h2>
        <p className="font-light"> {product.description} </p>
        <h2>
        {
            product.sellingPrice ? (
                <div className="flex gap-1 items-baseline">
                    <span className="text-2xl font-bold"> ${product.sellingPrice} </span> <span className="text-lg line-through text-gray-600"> ${product.price} </span>
                </div>
            ) : (
                <span className="text-2xl font-bold"> ${product.price} </span>
            )
        }
        </h2>
        <p className="text-gray-700 font-semibold"> Quantity: {product.itemQuantityType} </p>
        {/* Product count section */}
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 w-[140px] border rounded-sm px-3 py-2 text-lg justify-between">
                <button disabled={itemCount === 1} className="font-bold disabled:text-gray-400" onClick={()=> setItemCount(prev=> prev-1)}> - </button>
                <h2 className="px-2"> {itemCount} </h2>
                <button className="font-bold" onClick={()=> setItemCount(prev=> prev+1)}> + </button>
            </div>
            <span>=</span>
            <span className="text-xl font-semibold"> ${totalPrice.toFixed(2)} </span>
        </div>
        <Button className="flex items-center gap-2 w-max" onClick={handleCartSubmit}>
           <ShoppingBasket size="28px" /> { loading ? <Loader className="animate-spin" /> : "Add to Cart" }
        </Button>
        <div className="flex gap-2">
            <span className="font-semibold text-gray-600">Category: </span>
            <div>
            {
                product.categories.data.map((category: any) => (
                    <span className="" key={category.attributes.name}>  {category.attributes.name} </span>
                ))
            }
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDialog
