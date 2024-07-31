
import Link from 'next/link'
import { LogoFb, LogoIg, LogoWpp } from './Icons'
import Image from 'next/image'

const Contact = () => {
  return (
    <footer className="bg-slate-50 py-12">
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