'use client';
import { createUser } from '@/utils/apis/auth';
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { toast } from "sonner"



const RegisterPage = () => {
  const router = useRouter();
  const initialstate = {
    success: "",
    payload: null
  }
  if(sessionStorage.getItem('jwt')) {
    // router.push("/");
    redirect("/");
  }
  const [state, formAction] = useFormState(createUser, initialstate);
  console.log(state);
  if(state.success) {
    sessionStorage.setItem('jwt', state.payload.jwt);
    sessionStorage.setItem('user', JSON.stringify(state.payload.user));
    router.push("/");
  }
  if(state.success === false) {
    toast(state.message)
  }
  
  


  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[30%] px-8 py-12 rounded-md bg-slate-200">
        <h1 className="text-3xl font-bold mb-4 text-center">Create an Account</h1>
        <p className="font-semibold text-gray-500 mb-4 text-center">Enter your username, email & Password to create an account</p>
        <form  action={formAction} className="flex flex-col gap-3">
            <input type="text"   placeholder="Username" name="username" className="px-4 py-3 rounded-md outline-none" />
            <input type="email" placeholder="E-mail" name="email" className="px-4 py-3 rounded-md outline-none"  />
            <input type="password" placeholder="Password" name="password" className="px-4 py-3 rounded-md outline-none"  />
              <button className="py-2 px-4 rounded-md text-white bg-primary">Create an account</button>
           
        </form>
        <p className="mt-2">Already have an account? <Link href="/login" className="text-primary">Sign In</Link> </p>
      </div>
    </div>
  )
}

export default RegisterPage
