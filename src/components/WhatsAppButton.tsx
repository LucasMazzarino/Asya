import Link from 'next/link'
import { LogoWpp } from './Icons'

const WhatsAppButton = () => {
  return (
    <Link 
      href="https://api.whatsapp.com/send?phone=59896703656&text=Hola%2C%20vi%20esto%20en%20la%20web%20Asya.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n"
      target="_blank"
      rel="noopener noreferrer"
      className='fixed bottom-20 right-3 z-50 p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
    >
      <LogoWpp />
    </Link>
  )
}

export default WhatsAppButton