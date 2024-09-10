
export const getSliders = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_API}/sliders?populate=*`)
    if(!result.ok) {
        throw new Error("Something went wrong while fetching sliders");
    }
    const data = await result.json();

    return data.data;
}