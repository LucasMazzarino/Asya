

import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Cart from "./Cart"
import UserAccountNav from "./UserAccountNav"
import MobileNav from "./MobileNav"
import Image from "next/image"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"


const Navbar = async () => {


  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="absolute z-50 top-0 inset-x-0 h-16">
      <header className='relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-md'>
        <MaxWidthWrapper>
          <div className="flex h-16 items-center max-lg:ml-6 relative z-10">
            <MobileNav user={user}/>
            <div className="ml-4 flex lg:ml-0">
              <Link href='/'>
              <Image 
                src="https://cdn.asya.uy/favicon3.ico"
                alt="Favicon"
                width={70}
                height={70}
                priority/>
              </Link>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-start lg:space-x-6 lg:ml-6">
              <Link href="/product" className="text-white">Productos</Link>
              <span className="h-6 w-px bg-gray-200" arial-hidden="true" />
              <Link href="/order" className="text-white">Tus ordenes</Link>
              <span className="h-6 w-px bg-gray-200" arial-hidden="true" />
              <Link href="/aboutus" className="text-white">Sobre Nosotros</Link>
            </div>
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {user ? null : (
                  <Link href="/sign-in" className="text-white bg-orange-600 font-semibold p-2 rounded-md hover:bg-orange-700">Iniciar sesión</Link>
                )}
                {user ? null : (
                  <span className="h-6 w-px bg-gray-200" arial-hidden="true" />
                )}
                {user ? (
                  <UserAccountNav user={user} />
                ) : (
                  <Link
                    href="/sign-up"
                    className="text-white bg-orange-600 font-semibold p-2 rounded-md hover:bg-orange-700">
                    Regístrate Aquí
                  </Link>
                )}
                {user ? (
                  <span className="h-6 w-px bg-gray-200" arial-hidden="true" />
                ) : null}
                {user ? null : (
                  <div className="flex lg:ml-6">
                    <span className="h-6 w-px bg-gray-200" arial-hidden="true" />
                  </div>
                )}
              </div>
              <div className="mr-6 md:ml-4 flow-root lg:ml-6">
                <Cart user={user} />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar