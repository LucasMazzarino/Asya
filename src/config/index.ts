import { Package, DollarSign,ShieldCheck } from "lucide-react";
import React from "react";

export const PRODUCT_CATEGORIES = [
  {
    label: 'Hogar y Cocina',
    value: 'hogar y cocina' as const,
  },
  {
    label: 'Baño y cuidado personal',
    value: 'baño y cuidado personal' as const,
  },
  {
    label: 'Ropa y Accesorios',
    value: 'ropa y accesorios' as const,
  },
  {
    label: 'Bazar',
    value: 'bazar' as const,
  },
  {
    label: 'Otros',
    value: 'otros' as const,
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
    name:"Precios Mayoristas",
    Icon: DollarSign,
    description : "Puedes acceder a increibles descuentos por compras mayoristas. Te interesa? ponte en contacto con nosotros!"
  },
]


