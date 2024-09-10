


export const getProducts = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/products?populate=*`, {cache: 'no-store'});
    if(!result.ok) {
        throw new Error("Something went wrong whilc fetching Products");
    }
    const data = await result.json();

    return data.data;
}
// http://localhost:1337/api/products?filters[categories][name][$in]=Vegetables&populate=*
export const getProductsByCategory = async (catName: string) => {
    const encodedQuery = encodeURIComponent(catName);
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/products?filters[categories][name][$in]=${encodedQuery}&populate=*`, {cache: 'no-store'})

    if(!result.ok) {
        throw new Error("Something went wrong while fetching products by category name");
    }
    const data = await result.json();
    return data.data;
}