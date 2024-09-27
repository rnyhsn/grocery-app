'use server';

export interface IAction {
    success: any,
    message?: string,
    payload?: any
  }

export const createUser = async (prev: IAction, formData: FormData) => {
   
    const {username, email, password} = Object.fromEntries(formData);
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/auth/local/register`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username, email, password})
        })

        const result = await resp.json();
        if(result.data === null) {
            return {
                success: false,
                message: result.error.message
            }
        }
        return {
            success: true,
            payload: result
        }
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something Went wrong while creating user"
        }
    }

}

export const userLogin = async (prevState: any, formData: FormData) => {
    
    const {email, password} = Object.fromEntries(formData);
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/auth/local`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                identifier: email,
                password
            })
        })

        const result = await resp.json();
        if(result.data === null) {
            return {
                success: false,
                message: result.error.message
            }
        }
        console.log(result)
        return {
            success: true,
            payload: result
        }

    } catch (error) {
        console.log(error); 
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}