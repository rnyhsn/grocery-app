"use client";
import { getCartItems } from '@/utils/apis/cart';
import { CartContext } from '@/utils/providers/CartProvider';
import { ShoppingBasket } from 'lucide-react'
import { useContext, useEffect, useState } from 'react';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import CartItem from './CartItem';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
  


const CartCounter = () => {
    const [user, setUser] = useState<any|null>(null);
    const [jwt, setJwt] = useState<string>("");
    const [cartItems, setCartItems] = useState<any>();
    const [totalAmount, setTotalAmount] = useState(0);
    const jwtToken = sessionStorage.getItem('jwt');
    const userInfo = JSON.parse(sessionStorage.getItem('user') as string);
    const { value, setValue } = useContext(CartContext);
    const router = useRouter();

    useEffect(()=> {
        setUser(userInfo);
        setJwt(jwtToken as string);
    
    }, [])
    
    const getItems = async () => {
        const resp = await getCartItems(user?.id, jwt);
        setCartItems(resp);
        setValue(!value);
    }
    useEffect(()=> {
        getItems();
        getTotalAmount();
    }, [value])
  
    const getTotalAmount = () => {
        let amounts = 0;
        for(let i = 0; i < cartItems?.length; i++) {
            amounts += cartItems[i].attributes.amount;
        }
        console.log(amounts);
        setTotalAmount(amounts);
    }
    
  return (
    <Sheet>
  <SheetTrigger asChild>
        <div className="relative">
            <ShoppingBasket size="28px" />
            <div className="bg-red w-5 h-5 rounded-full bg-red-400 text-white flex items-center justify-center absolute -top-1 -right-1 text-xs"> {cartItems?.length} </div>
        </div>
  </SheetTrigger>
  <SheetContent className="overflow-auto">
    <SheetHeader>
      <SheetTitle className="text-center bg-primary text-white py-1 font-semibold">My Cart</SheetTitle>
      <SheetDescription>
        {
            cartItems?.map((cartItem:any) => (
                <CartItem item={cartItem}  />
            ))
        }
      </SheetDescription>
    </SheetHeader>
    {
        cartItems?.length > 0 ? (
            <SheetFooter >
            <SheetClose asChild>
                <div className="flex flex-col w-full gap-1 mt-4">
                <h2 className="flex justify-between w-full font-semibold "> Subtotal: <span>${totalAmount.toFixed(2)}</span> </h2>
                
                    <Button type="submit" className="outline-none" onClick={()=> router.push(jwt ? "/checkout": "login") }>
                        Add to Carts
                    </Button>
                
                </div>
            </SheetClose>
            </SheetFooter>
        ) : (
            <h2 className="font-bold mt-10 text-center">Cart is Empty.<br/>Add Product to your cart</h2>
        )
    }

  </SheetContent>
</Sheet>
  
  )
}

export default CartCounter
