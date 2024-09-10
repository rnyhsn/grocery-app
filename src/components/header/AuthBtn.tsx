"use client";
import { CircleUserRound } from 'lucide-react';
import { Button } from '../ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';


const AuthBtn = () => {
    const [user, setUser] = useState<{}|null>(null);

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user") as string));
    }, [])
    
    const handleLogout = () => {
        sessionStorage.clear();
        setUser(sessionStorage.getItem("user"));
    }
  return (
    <div>
    {
        user ?  (
           
                <DropdownMenu>
                <DropdownMenuTrigger asChild>  
                <div className="p-1.5 rounded-full bg-red-400 cursor-pointer text-white">
                    <CircleUserRound />
                </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="relative right-8">
                    <DropdownMenuItem>My Account</DropdownMenuItem>
                    <DropdownMenuItem>My Cart</DropdownMenuItem>
                    <DropdownMenuItem>My Order</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
        ) : (
        <Link href="/login">
            <Button className="bg-primary">Login</Button>
        </Link>
        )
    }
    </div>
  )
}

export default AuthBtn
