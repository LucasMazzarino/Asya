import Map from './Map'
import Link from 'next/link'
import { LogoFb, LogoIg, LogoWpp } from './Icons'
import Image from 'next/image'

const Contact = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">  
        <div className="col-span-2 space-y-4">
          <h3 className="text-3xl font-medium">Contáctanos</h3>
          <h4 className='text-xl font-medium'>Dirección</h4>
          <div className="grid gap-2">
            <div className="flex items-start gap-3">
              <p className='text-lg text-muted-foreground mb-3'>Precursores M 280S 7 Pinar. Canelones</p>
            </div>
            <h4 className='text-xl font-medium'>Número</h4>
            <div className="flex items-start gap-2">     
              <p className='text-lg text-muted-foreground mb-3'>+1 (555) 555-5555</p>
            </div>
            <h4 className='text-xl font-medium'>Email</h4>
            <div className="flex items-start gap-2">
              <p className='text-lg text-muted-foreground mb-3'>servicio@asya.uy</p>
            </div>
            <h3 className='text-xl font-medium'>Horario</h3>
            <div className="flex items-start gap-2">
              <p className='text-lg text-muted-foreground mb-3'>Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>   

        <div className="col-span-1 md:col-span-3 lg:col-span-1 flex justify-center items-center">
          <Map />
        </div>
      </div>
      <div className="container max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs text-muted-foreground">&copy; 2024 Empresa. Todos los derechos reservados.</p>
        <nav className="flex gap-4 sm:gap-6 text-xs">
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Términos de Servicio
          </Link>
          <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
            Política de Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Contact