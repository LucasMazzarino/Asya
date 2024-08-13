import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import ShowOrders from "@/components/ShowOrders"
import { Button, buttonVariants } from "@/components/ui/button"
import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from 'next/headers'
import Image from "next/image"
import Link from 'next/link';


const orderPage = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 pt-10 m-6 bg-background">     
        <Image src='https://asya.uy/login-img.png' alt="login" width={1000} height={1000} className="rounded-xl"/> 
        <h4 className="text-center pb-4 text-xl text-white font-semibold md:text-3xl">Para realizar o ver tus pedidos debes iniciar sesión</h4>
        <Link href="/sign-in" className="pb-5">
        <Button variant="default">
          Iniciar Sesión
        </Button>
      </Link>
      </div>
    );
  }

  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id
      }
    }
  })

  console.log(orders)
  return (
    <MaxWidthWrapper>
      <div className="bg-background">
        <div className="max-w-2xl px-4 pb-24 pt-16 sm:px-2 lg:max-w-7xl lg:px-8">
          <h4 className="text-white text-3xl font-bold tracking-tight pt-6 sm:text-4xl mb-4">
            Tus ordenes
          </h4>
          {orders.length > 0 ? 
            <ShowOrders orders={orders} /> :
            <div className="flex flex-col items-center justify-center h-full font-semibold">
              <div className="border shadow-sm rounded-lg flex-1 flex items-center justify-center p-8 mb-4">
                <div className="flex flex-col items-center gap-4">
                  <Image src="https://asya.uy/empty-cart.webp" alt="No orders" width={900} height={900}/>
                  <h3 className="text-primary font-bold text-2xl tracking-tight">No hay pedidos aún</h3>
                  <p className="text-md text-white dark:text-gray-400">
                    No has realizado ningún pedido aun, visita nuestra tienda!
                  </p>
                </div>
              </div>
              <Link href="/product" className={buttonVariants({ size:"lg" })}>Tienda</Link>
           </div>
          }
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default orderPage