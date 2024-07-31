'use client'

import { useState, useEffect } from 'react';
import { buttonVariants } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  const [showFirstImage, setShowFirstImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage(prev => !prev);
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-0 mx-auto text-center flex flex-col items-center lg:py-4 max-w-full rounded-lg bg-cover bg-center bg-no-repeat h-[75vh]">
      <div className={`absolute inset-0 z-10 transition-opacity duration-4000 ease-in-out ${showFirstImage ? 'opacity-100' : 'opacity-0'}`}>
        <Image 
          src="/Banner.webp" 
          alt="Background" 
          quality={100}
          fill
          sizes="100vw"
          priority
          className="object-cover h-full w-full"
        />
      </div>
  
      <div className={`absolute inset-0 z-20 transition-opacity duration-4000 ease-in-out ${showFirstImage ? 'opacity-0' : 'opacity-100'}`}>
        <Image 
          src="/Banner2.webp" 
          alt="Hover Image" 
          fill
          sizes="100vw"
          priority
          className="object-cover h-full w-full"
        />
      </div>

      {/* Texto sobre las imágenes */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-12 z-30">
        <div className="mt-6">
          <Link href="/product" className={buttonVariants()}>
            Ver Productos
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Banner;