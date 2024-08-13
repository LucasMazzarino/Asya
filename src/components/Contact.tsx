import Map from './Map'
import { LogoFb, LogoIg} from './Icons'
import Image from 'next/image'

const Contact = () => {
  return (
    <section className="bg-background py-12 border-t border-gray-500 ">
      <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">  
        <div className="col-span-2 space-y-4">
          <h3 className="text-3xl font-medium text-primary">Contáctanos</h3>
          <h4 className='text-xl font-medium text-white'>Dirección</h4>
          <div className="grid gap-2">
            <div className="flex items-start gap-3">
              <p className='text-lg text-muted-foreground mb-3'>Precursores M 280S 7 Pinar. Canelones</p>
            </div>
            <h4 className='text-xl font-medium text-white'>Número</h4>
            <div className="flex items-start gap-2">     
              <p className='text-lg text-muted-foreground mb-3'>096 703 656</p>
            </div>
            <h4 className='text-xl font-medium text-white'>Email</h4>
            <div className="flex items-start gap-2">
              <p className='text-lg text-muted-foreground mb-3'>servicio@asya.uy</p>
            </div>
            <h4 className='text-xl font-medium text-white'>Horario</h4>
            <div className="flex items-start gap-2">
              <p className='text-lg text-muted-foreground mb-3'>Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <LogoFb />
              <LogoIg />
            </div>
          </div>
        </div>   

        <div className="col-span-1 md:col-span-3 lg:col-span-1 space-y-4">
          <h4 className="text-xl font-medium text-white">Contáctanos vía WhatsApp</h4>
          <p className='text-lg text-muted-foreground mb-3'>
            <a href="https://wa.me/096703656" className="text-primary underline">
              Enviar un mensaje por WhatsApp
            </a>
          </p>
          <h4 className="text-xl font-medium text-white">Síguenos en Redes Sociales</h4>
          <p className='text-lg text-muted-foreground mb-3'>
            Mantente al día con nuestras últimas noticias y ofertas especiales.
          </p>
          <h4 className="text-xl font-medium text-white">Información de la Empresa</h4>
          <p className='text-lg text-muted-foreground mb-3'>
            En Asya, estamos comprometidos con ofrecer productos de alta calidad y un servicio excepcional. Contáctanos para más información.
          </p>
        </div>
      </div> 
    </section>
  )
}

export default Contact