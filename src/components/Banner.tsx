'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % 4);
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://asya.uy/mates.webp",
    "https://asya.uy/platos.webp",
    "https://asya.uy/termos.webp",
    "https://asya.uy/tasas.webp"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setAnimationComplete(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative py-0 mx-auto text-center flex flex-col items-center lg:py-4 max-w-full rounded-lg bg-cover bg-center bg-no-repeat h-[100vh]">
      {images.map((src, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-10 transition-opacity duration-4000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image 
            src={src} 
            alt={`Background ${index}`} 
            quality={80}
            fill
            sizes="100vw"
            priority
            className="object-cover h-full w-full"
          />
        </div>
      ))}
      
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-black opacity-50"></div>
        <div className="absolute inset-y-0 left-1/2 w-1/2 bg-gradient-to-r from-black opacity-50 to-transparent"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-center text-left py-6 left-8 md:left-24 z-30 space-y-4">
        <h1 
          className={cn("text-white text-3xl md:text-5xl font-bold mb-4 transform transition-all duration-700", {
            "translate-y-0 opacity-100": animationComplete,
            "translate-y-10 opacity-0": !animationComplete,
          })}
        >
          Juanimar Importador Mayorista
        </h1>
        <h1 
          className={cn("text-white text-3xl md:text-5xl font-bold mb-4 transform transition-all duration-1000 delay-900", {
            "translate-y-0 opacity-100": animationComplete,
            "translate-y-10 opacity-0": !animationComplete,
          })}
        >
          Representante oficial de Asya y Cosecha
        </h1>
        <p 
          className={cn("text-white text-base md:text-xl max-w-lg leading-relaxed mb-6 transform transition-all duration-1000 delay-600", {
            "translate-y-0 opacity-100": animationComplete,
            "translate-y-10 opacity-0": !animationComplete,
          })}
        >
          Calidad y precios imbatibles para todos: Desde ventas al público hasta precios mayoristas, ¡te ofrecemos lo mejor en cada compra!
        </p>
        <div className={cn("flex gap-4 transform transition-opacity duration-1000 delay-600", {
          "opacity-100": animationComplete,
          "opacity-0": !animationComplete,
        })}>
          <Link href="/product" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Ver Productos
          </Link>
          <Link href="/aboutus" className="bg-transparent text-white px-4 py-2 rounded border border-orange-500 hover:bg-slate-400">
            Sobre Nosotros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
