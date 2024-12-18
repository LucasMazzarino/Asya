'use client'

import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'


interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } =
    trpc.auth.verifyEmail.useQuery({
      token,
    })

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-white text-xl'>
          Hubo un problema
        </h3>
        <p className='text-muted-foreground text-sm'>
          El token no es valido o a expirado
          Por favor intente nuevamente
        </p>
      </div>
    )
  }

  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center mb-10'>
        <div className='relative mb-4 h-90 w-90 text-muted-foreground'>
          <Image
            src='https://cdn.asya.uy/verify-complete.webp'
            width='1400'
            height='1400'
            alt='email enviado'
          />
        </div>
        <h3 className='font-semibold text-white text-2xl mt-4'>
          Todo Listo!
        </h3>
        <p className='text-muted-foreground text-center mt-1'>
          Gracias por verificar tu email.
        </p>
        <Link
          className={buttonVariants({ className: 'mt-4'})}
          href='/sign-in'>
          Iniciar sesión
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
        <h3 className='font-semibold text-xl'>
        Verificando...
        </h3>
        <p className='text-muted-foreground text-sm'>
          Esto no tardara mucho tiempo.
        </p>
      </div>
    )
  }
}

export default VerifyEmail