"use client";
import { Button } from '@/components/ui/button'
import { createOrder, getCartItems } from '@/utils/apis/cart';
import { ArrowBigRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CheckoutPage = () => {
    const [user, setUser] = useState<any>(null);
    const [jwt, setJwt] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [cartLength, setCartLength] = useState(0);
    const [cartItems, setCartItems] = useState<any>(null);
    const [passedCartItems, setPassedCartItems] = useState<any>([])
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [taxRate, setTaxRate] = useState(0.05);
    const [tax, setTax] = useState(0);
    const [charge, setCharge] = useState(5);

    const userInfo = JSON.parse(sessionStorage.getItem('user') as string);
    const jwtInfo = sessionStorage.getItem('jwt') as string;
   
    useEffect(()=> {
        setUser(userInfo);
        setJwt(jwtInfo);
         getCartItemInfo();
    }, [jwt]);
        // console.log(cartItems);
      
        // console.log(items);
    const getCartItemInfo = async () => {
        const resp = await getCartItems(user?.id, jwt)
        setCartItems(resp);
        setCartLength(resp?.length)
        let subAmount = 0;
        for(let i = 0; i < resp?.length; i++) {
            subAmount += resp[i].attributes.amount;
        }
        let items = resp?.map((item:any) => (
            {
                quantity: item.attributes.quantity,
                price: item.attributes.amount,
                product: item.attributes.product.data.id
            }
        ))
        // console.log(items);
        setPassedCartItems(items && items);
        const totalAmount = subAmount + subAmount*taxRate + charge;
        
        setSubtotal(subAmount);
        setTotal(totalAmount);
        setTax(subAmount*taxRate);
   
    }
    
    const handlePayment = async () => {
        const data = {
            data:  {
                username: name,
                email,
                phone,
                zip,
                address,
                totalOrderedAmount: total,
                userId: user?.id,
                paymentId: Math.floor(Math.random()*10000000000).toString(32),
                OderedItemList: passedCartItems
            }
        }
        console.log(data);
        const resp = await createOrder(data, jwt);
        console.log(resp);
    }
  return (
    <div>
      <h1 className="bg-primary text-white text-center text-3xl py-3 font-bold">Checkout</h1>
      <div className="px-4 md:px-10 lg:px-20 flex gap-28 mt-10">
            <div className="flex-[2]">
                <div className="w-full">
                <h1 className="text-center text-2xl mb-7 font-bold">Billing Details</h1>
                <form action="" className="flex flex-col gap-4">
                    <div className="flex gap-6">
                    <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder="Name" className="w-1/2 py-2 px-3 border-2 border-gray-200 rounded-md" />
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder="E-mail" className="w-1/2 py-2 px-3 border-2 border-gray-200 rounded-md" />
                    </div>
                    <div className="flex gap-6">
                    <input onChange={(e)=> setPhone(e.target.value)} value={phone} type="text" placeholder="Phone" className="w-1/2 py-2 px-3 border-2 border-gray-200 rounded-md" />
                    <input onChange={(e)=> setZip(e.target.value)} value={zip} type="text" placeholder="Zip" className="w-1/2 py-2 px-3 border-2 border-gray-200 rounded-md" />
                    </div>
                    <textarea onChange={(e)=> setAddress(e.target.value)} value={address} placeholder="Address" className=" py-2 px-3 border-2 border-gray-200 rounded-md h-[80px]" />
                </form>
                </div>
            </div>
            <div className="flex-1">
                <div className="border border-gray-200 rounded-md">
                <h2 className="text-center py-4 text-xl bg-gray-200 font-bold">Total Cart({cartLength})</h2>
                <div className="p-4">
                    <div className="py-2 flex items-center justify-between font-bold border-b border-gray-300">
                        <span className="">Subtotal:</span>
                        <span>${subtotal}</span>
                    </div>
                    <div className="flex flex-col border-b border-gray-300">
                    <div className="py-2 flex items-center justify-between font-semibold">
                        <span>Delivery:</span>
                        <span> ${charge} </span>
                    </div>
                    <div className="py-2 flex items-center justify-between font-semibold">
                        <span>Tax (5%):</span>
                        <span> ${tax} </span>
                    </div>
                    </div>
                    <div className="py-2 flex items-center justify-between font-bold">
                        <span>Total: </span>
                        <span>${total.toFixed(2)} </span>
                    </div>
                </div>
                <Button onClick={handlePayment} className="w-full">Payment <ArrowBigRight /> </Button>
                </div>
            </div>
      </div>
    </div>
  )
}

export default CheckoutPage
