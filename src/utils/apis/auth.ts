'use server';


export const createUser = async (prev: any, formData: FormData) => {
   
    const {username, email, password} = Object.fromEntries(formData);
    try {
        const resp = await fetch("http://localhost:1337/api/auth/local/register", {
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
        const resp = await fetch("http://localhost:1337/api/auth/local", {
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