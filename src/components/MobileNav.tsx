'use client'

import { User } from '@/payload-type'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserAccountNav from './UserAccountNav'

const MobileNav = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  return (
    <div className='fixed inset-0 z-60 flex'>
      <div className='absolute inset-0 bg-black bg-opacity-25' onClick={() => setIsOpen(false)} />
      <div className='relative w-2/3 max-w-sm bg-white shadow-xl z-70'>
        <div className='flex px-4 pb-2 pt-5'>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
            <X className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='space-y-6 border-t border-gray-200 bg-white px-4 py-6'>
          <div className='pb-4 border-b-2 space-y-2'>
            <Link
              onClick={() => closeOnCurrent('/product')}
              href='/product'
              className='block p-2 font-medium text-gray-900 text-sm'>
              Productos
            </Link>
            <Link
              onClick={() => closeOnCurrent('/order')}
              href='/order'
              className='block p-2 font-medium text-gray-900 text-sm'>
              Tus órdenes
            </Link>
            <Link
              onClick={() => closeOnCurrent('/aboutus')}
              href='/aboutus'
              className='block p-2 font-medium text-gray-900 text-sm'>
              Sobre Nosotros
            </Link>
          </div>
          <div className='flow-root'>
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <div>
                <Link
                  onClick={() => closeOnCurrent('/sign-in')}
                  href='/sign-in'
                  className='block p-2 font-medium text-gray-900'>
                  Inicia sesión
                </Link>
                <div className='flow-root'>
                      <Link
                        onClick={() => closeOnCurrent('/sign-up')}
                        href='/sign-up'
                        className='block p-2 font-medium text-gray-900'>
                        Registrare
                      </Link>
                    </div>
                  </div>
                  )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
