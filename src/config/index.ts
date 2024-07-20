import { Package, DollarSign,ShieldCheck } from "lucide-react";
import React from "react";

export const PRODUCT_CATEGORIES = [
  {
    label: 'Hogar y Cocina',
    value: 'hogar y cocina' as const,
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=anillos`,
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'New Arrivals',
        href: '/product?category=anillos&sort=desc',
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=anillos',
        imageSrc: '/media/DSC00526.JPG',
      },
    ],
  },
  {
    label: 'Baño y cuidado personal',
    value: 'baño y cuidado personal' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=pulseras`,
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=pulseras&sort=desc',
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=pulseras',
        imageSrc: '/media/DSC00526.JPG',
      },
    ],
  },
  {
    label: 'Construcción y Decoración',
    value: 'construcción y decoración' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=pulseras`,
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=pulseras&sort=desc',
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=pulseras',
        imageSrc: '/media/DSC00526.JPG',
      },
    ],
  },
  {
    label: 'Ropa y Accesorios',
    value: 'ropa y accesorios' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=pulseras`,
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=pulseras&sort=desc',
        imageSrc: '/media/DSC00526.JPG',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=pulseras',
        imageSrc: '/media/DSC00526.JPG',
      },
    ],
  },
]

export const ICONS_HOME = [
  {
    name:"Envíos a todo el País",
    Icon: Package,
    description : "Entregamos tus pedidos de manera rápida y eficiente, para que puedas disfrutar de tus productos lo antes posible."
  },
  {
    name:"Seguridad garantizada",
    Icon:ShieldCheck,
    description : "Protegemos tus datos y transacciones con los más altos estándares de seguridad, para que puedas comprar con tranquilidad."
  },
  {
    name:"Puedes convertirte en Revendedor",
    Icon: DollarSign,
    description : "Accede a precios mayorista con grandes descuentos, ahorrando dinero en tus compras."
  },
]


