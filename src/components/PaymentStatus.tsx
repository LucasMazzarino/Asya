'use client'

import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({
  orderEmail,
  orderId,
  isPaid,
}: PaymentStatusProps) => {
  const router = useRouter()

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) =>
        data?.isPaid ? false : 15000,
    }
  )

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  return (
    <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm'>
      <div>
        <p className='font-medium text-primary'>
          Envío a
        </p>
        <p className='text-white'>{orderEmail}</p>
      </div>

      <div>
        <p className='font-medium text-primary'>
          Estado de la orden
        </p>
        <p className='text-white'>
          {isPaid
            ? 'Pago exitoso'
            : 'Pago pendiente'}
        </p>
      </div>
    </div>
  )
}

export default PaymentStatus