import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { getSliders } from "@/utils/apis/slider";
import Image from 'next/image';
  

const Silder = async () => {
    const sliders = await getSliders();
    // console.log(sliders);
    // console.log(sliders[0].attributes.image.data.attributes.url)
  return (
    <div className="mx-4 sm:mx-8 md:mx-16">
      <Carousel >
        <CarouselContent className=" h-[400px] bg-red-400 mt-10 relative">
        {
            sliders.map((slider: any) => (
                <CarouselItem className="mx-auto" key={slider.attributes.name}> <Image alt="" fill src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider.attributes.image.data.attributes.url }  /> </CarouselItem>
            ))
        }
           
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

    </div>
  )
}

export default Silder
