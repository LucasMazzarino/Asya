'use client'

import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight ,Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import {
  SignInAuthCredentialsValidator,
  TSignInAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const origin = searchParams.get('origin')


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInAuthCredentialsValidator>({
    resolver: zodResolver(SignInAuthCredentialsValidator),
  })

  const { mutate: signIn, isLoading } =
    trpc.auth.signIn.useMutation({
      onSuccess: async () => {
        toast.success('Iniciaste Session con éxito')

        router.refresh()

        if (origin) {
          router.push(`/${origin}`)
          return
        }

        // if (isSeller) {
        //   router.push('/sell')
        //   return
        // }

        router.push('/')
        router.refresh()

      },
      onError: (err) => {
        if (err.data?.code === 'UNAUTHORIZED') {
          toast.error('Email o contraseña incorrectos.')
        }
      },
    })

  const onSubmit = ({
    email,
    password,
  }: TSignInAuthCredentialsValidator) => {
    signIn({ email, password })
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Image 
                src="https://cdn.asya.uy/favicon3.ico"
                alt="Favicon"
                width={140}
                height={140}
                priority/>
            <h3 className='text-2xl text-white font-bold tracking-tight'>
              Inicia sesión en tu {' '}
              cuenta
            </h3>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/sign-up'>
              No tienes cuenta? Regístrate Aquí
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label 
                    htmlFor='email' 
                    className='text-white'>Correo</Label>
                  <Input
                    {...register('email')}
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      'focus-visible:ring-red-500':
                        errors.email,
                    })}
                    placeholder='Tucorreo@ejemplo.com'
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label 
                    htmlFor='password'
                    className='text-white'>Contraseña</Label>
                  <Input
                    {...register('password')}
                    type='password'
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      'focus-visible:ring-red-500':
                        errors.password,
                    })}
                    placeholder='Contraseña'
                  />
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Iniciar sesión
                </Button>
              </div>
            </form>

            <div className='relative'>
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
              </div>
            </div>
          </div>
        </div>
        <Link 
           className={buttonVariants({
            variant: 'link',
            className: 'gap-1.5',
          })}
          href='/sell/forgot'>
            Olvidaste la contraseña? restablecerla Aquí
          <ArrowRight className='h-4 w-4'/>
          </Link>

      </div>
    </>
  )
}

export default Page