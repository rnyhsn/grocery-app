"use client";
import { createContext, useState } from "react";

export const CartContext = createContext<any>(0)

export const CartProvider = ({children}: {children: React.ReactNode}) => {

    const [value, setValue] = useState(0);

    return (
        <CartContext.Provider value={{value, setValue}} >
            {children}
        </CartContext.Provider>
    )
}
