

export const addToCart = async ({quantity, amount, productId, userId}: {quantity: number, amount: number, productId: number, userId: number}, jwt: string) => {
    console.log(quantity, amount, productId, userId);
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/user-carts`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearar ${jwt}`
            },
            body: JSON.stringify({
                data: {
                    quantity,
                    amount,
                    product: productId,
                    users_permissions_user: userId,
                    userId
                }
            })
        } )

        const result = await resp.json();
        return {
            success: true,
            message: "Product added to cart successfully"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong while prduct add to cart"
        }
    }
}


export const getCartItems = async (userId: number, jwt: string) => {
    // console.log(userId);
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/user-carts?filters[userId][$eq]=${userId}&[populate][product][populate][images][populate][0]=url`, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
    const result = await resp.json();
    // console.log(result);
    return result.data;
    
}

export const deleteCartItem = async (cartId: number, jwt: string) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/user-carts/${cartId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    const result = await resp.json();
    return result;
}

export const createOrder = async (data: any, jwt: string) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/orders`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(data)
    })
    console.log(resp);
    const result = await resp.json();
    return result;
}