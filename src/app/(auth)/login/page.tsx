"use client";
import { userLogin } from '@/utils/apis/auth';
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react'
import { useFormState } from 'react-dom';
import { toast } from 'sonner';



const LoginPage = () => {

 
  const initialstate = {
    success: "",
    message: ""
  }
  const router = useRouter();
  if(sessionStorage.getItem("jwt")) {
      // router.push("/");
      redirect("/");
  }
  const [state, formAction] = useFormState(userLogin, initialstate as any);
  // console.log(state);
  if(state.success) {
    sessionStorage.setItem('jwt', state.payload.jwt);
    sessionStorage.setItem('user', JSON.stringify(state.payload.user));
    router.push("/");
  }
  if(state.success === false) {
    toast(state.message);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[30%] px-8 py-12 rounded-md bg-slate-200">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
        <p className="font-semibold text-gray-500 mb-4 text-center">Enter your email & Password to sign in</p>
        <form action={formAction} className="flex flex-col gap-3">
           
            <input type="email" name="email" placeholder="E-mail" className="px-4 py-3 rounded-md outline-none"  />
            <input type="password" name="password" placeholder="Password" className="px-4 py-3 rounded-md outline-none"  />
            <button className="py-2 px-4 rounded-md text-white bg-primary">Create an account</button>
        </form>
        <p className="mt-2">Don't have an account? <Link href="/register" className="text-primary">Sign Up</Link> </p>
      </div>
    </div>
  )
}

export default LoginPage
