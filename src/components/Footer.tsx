import Link from 'next/link'
// import { LogoFb, LogoIg } from './Icons'
// import Footersvg from './Footersvg'

const Contact = () => {
  return (
    <footer className="bg-foreground border-t">
      <div className="container max-w-7xl mt-2 flex flex-col items-center justify-center">
        <p className="text-xs text-white pb-4 mb-2 sm:mb-0">&copy; 2024 Empresa. Todos los derechos reservados.</p>
        <nav className="flex gap-4 sm:gap-6 text-xs justify-center mb-4">
          <Link href="#" className="text-white hover:underline underline-offset-4" prefetch={false}>
            Términos y Politicas de Uso
          </Link>
        </nav>
      </div>
      <div className="mt-4 w-full">
        {/* <Footersvg /> */}
      </div>
    </footer>
  )
}

export default Contact
