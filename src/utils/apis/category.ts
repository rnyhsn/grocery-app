

export const getCategories = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/categories?populate=*`);
    if(!result.ok) {
        throw new Error("Something went wrong while fetching categories");
    }
    const data = await result.json();

    return data.data;
}

