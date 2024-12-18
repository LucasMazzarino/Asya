"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpAuthCredentialsValidator, TSignUpAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { ZodError } from "zod"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Page = () => {

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<TSignUpAuthCredentialsValidator>({
    resolver: zodResolver(SignUpAuthCredentialsValidator)
  })


  const router = useRouter()

  const {mutate, isLoading} = 
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if(err.data?.code === "CONFLICT") {
          toast.error("Este email ya esta en uso")
          return
        }
      
        if(err instanceof ZodError) {
          toast.error(err.issues[0].message)
          return
        }
        toast.error('Algo salio mal')
      },
      onSuccess: ({sentoToEmail}) => {
        toast.success(`Email de verificación enviado ${sentoToEmail}.`)
        router.push('/')
      }   
  })

  const OPTIONS = [
    "Seleccione su departamento",
    "Artigas",
    "Canelones",
    "Cerro Largo",
    "Colonia",
    "Durazno",
    "Flores",
    "Florida",
    "Lavalleja",
    "Maldonado",
    "Montevideo",
    "Paysandú",
    "Río Negro",
    "Rivera",
    "Rocha",
    "Salto",
    "San José",
    "Soriano",
    "Tacuarembó",
    "Treinta y Tres",
  ];


  const onSubmit = ({
    email, 
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
    department
  }: TSignUpAuthCredentialsValidator) => {
    mutate({ email, password, firstName, lastName, phoneNumber, address, department}
    )
  }

  return (
    <>
      <div className='container relative flex pt-20 pb-10 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Image 
                src="https://cdn.asya.uy/favicon3.ico"
                alt="Favicon"
                width={140}
                height={140}
                priority/>
            <h2 className="text-2xl text-white font-bold">
              Crear mi Cuenta
            </h2>
            <Link className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5'
            })}
              href='/sign-in'>
              Ya tienes una cuenta? Inicia sesión aquí
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 pb-5">
                <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='email'
                    className="text-white">Correo</Label>
                  <Input 
                    {...register("email")}
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                        "focus-visible:ring-red-500 border-red-500": errors.email,
                      }
                    )}
                      placeholder="Tucorreo@ejemplo.com"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='name'
                    className="text-white">Nombre</Label>
                  <Input
                    {...register("firstName")}
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      "focus-visible:ring-red-500": errors.firstName,
                    })}
                      placeholder="Juan"
                    />
                    {errors?.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                </div>               
                <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='name'
                    className="text-white">Apellido</Label>
                  <Input
                    {...register("lastName")}
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      "focus-visible:ring-red-500": errors.lastName,
                    })}
                      placeholder="Rodriguez"
                    />
                    {errors?.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                </div>               
                <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='phoneNumber'
                    className="text-white">Celular</Label>
                  <Input
                    {...register("phoneNumber", {
                      required: "El número de teléfono es requerido",
                    })}
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      "focus-visible:ring-red-500": errors.phoneNumber,
                    })}
                      placeholder="123456789"
                    />
                    {errors?.phoneNumber && (
                      <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                    )}
                </div>               
                <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='department'
                    className="text-white">Departamento</Label>
                    <select
                      {...register("department")}
                      className="block w-full py-2 pl-3 pr-10 border border-gray-200 rounded-md focus:outline-none sm:text-sm"
                    >
                      {OPTIONS.map((dep) => (
                        <option key={dep} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                  {errors?.department && (
                    <p className="text-sm text-red-500">{errors.department.message}</p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='address'
                    className="text-white">Dirección</Label>
                  <Input
                    {...register("address")}
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      "focus-visible:ring-red-500": errors.address,
                    })}
                      placeholder="Tu dirección aquí"
                    />
                    {errors?.address && (
                      <p className="text-sm text-red-500">{errors.address.message}</p>
                    )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label 
                    htmlFor='password'
                    className="text-white">Contraseña</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn(
                      "bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      {
                      "focus-visible:ring-red-500": errors.password,
                    })}
                      placeholder="Contraseña"
                    />
                    {errors?.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>             
                <Button>Registrarme</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page