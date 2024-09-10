import Banner from "@/components/body/home/Banner";
import CategoryList from "@/components/body/home/CategoryList";
import PopularProduct from "@/components/body/home/PopularProduct";
import Silder from "@/components/body/home/Silder";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Silder />
      <CategoryList />
      <PopularProduct />
      <Banner />
    </div>
  );
}
