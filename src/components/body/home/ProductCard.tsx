import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductDialog from './ProductDialog'


const ProductCard = ({product}: {product: any}) => {
 
  return (
    <div className="border rounded-md flex flex-col p-4 hover:scale-105 transition-all ease-in-out cursor-pointer shadow-md">
        <div className="h-[220px] w-full flex items-center justify-center">
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes.images.data[0].attributes.url} alt="" className="object-contain" width={180} height={200} />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-lg font-semibold"> {product.attributes.name} </h2>
          <div>
              {/* {product.attributes.price} */}
              {
                product.attributes.sellingPrice ? (
                  <div className="flex gap-2 items-baseline">
                    <span className="font-semibold text-lg"> ${product.attributes.sellingPrice} </span> <span className="text-sm line-through text-gray-500"> ${product.attributes.price} </span>
                  </div>
                ) : (
                  <span className="font-semibold"> ${product.attributes.price} </span>
                )
              }
          </div>
          <Dialog>
          <DialogTrigger asChild>
          <Button variant="outline">Add to Cart</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
                <ProductDialog product={product.attributes} productId={product.id} />
            </DialogHeader>
          </DialogContent>
        </Dialog>

          
        </div>
    </div>
  )
}

export default ProductCard
