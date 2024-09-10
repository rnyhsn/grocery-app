import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className="px-4 md:x-8 lg:px-16 ">
        <div className="w-full relative h-[400px]">
        <Image src="/banner.png" alt="" className="" fill />
        </div>
    </div>
  )
}

export default Banner
