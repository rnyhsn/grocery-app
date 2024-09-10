"use client";
import { deleteCartItem } from '@/utils/apis/cart';
import { Trash } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect } from 'react'

const CartItem = ({item}: {item: any}) => {
    const jwt = sessionStorage.getItem('jwt');
    const handleDelete = async () => {
        await deleteCartItem(item.id, jwt as string);
    }
    useEffect(()=> {
    }, []);
  return (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-3">
            <div>
                <Image className="border-2 border-gray-300 rounded-md py-2 px-1" src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+item.attributes.product.data.attributes.images.data[0].attributes.url} alt="" width={60} height={60} />
            </div>
            <div>
                <h2 className="font-bold text-lg text-black"> {item.attributes.product.data.attributes.name} </h2>
                <p className="text-sm text-gray-600"> Quantity: {item.attributes.quantity} </p>
                <p className="font-bold"> Amount: ${item.attributes.amount} </p>
            </div>
        </div>
        <Trash onClick={handleDelete} className="cursor-pointer" />
    </div>
  )
}

export default CartItem
