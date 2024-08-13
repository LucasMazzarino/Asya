import { cn } from '@/lib/utils';
import { Order, Product, User } from '@/payload-type'
import Image from 'next/image'

interface props {
  orders: Order[]
}

const ShowOrders = async ({orders} : props) => {

    const truncateText = (text: string, maxLength: number): string => {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + '...';
    };

    return (
      <div className='font-inter text-md md:text-lg'>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const items = order.items.map(item => ({
              ...item,
              product: item.product as Product,
            }));
  
            return (
              <li key={order.id} className="text-white bg-gray-500 rounded-xl p-4 flex flex-col">
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold truncate">Orden ID: #{truncateText(order.id, 15)}</h3>
                    <span
                      className={cn('px-2 py-1 rounded-full text-xs font-medium ml-2', {
                        'bg-green-300 text-green-600': order._isPaid,
                        'bg-yellow-300 text-yellow-700': !order._isPaid,
                      })}
                    >
                      {order._isPaid ? 'Aprobada' : 'Pendiente'}
                    </span>
                  </div>
                  <ul>
                    {items.map(({ product, quantity, price }) => {
                      const { image } = product.images[0];
  
                      return (
                        <li key={product.id} className='flex space-x-6 py-2'>
                          <div className='relative h-24 w-24'>
                            {typeof image !== 'string' && image.url ? (
                              <Image
                                fill
                                sizes="(max-width: 100px) 100vw, (max-width: 100px) 50vw, 33vw"
                                src={image.url}
                                alt={`${product.name} image`}
                                className='flex-none rounded-md bg-gray-50 object-cover object-center'
                              />
                            ) : null}
                          </div>
                          <div className='flex flex-col'>
                            <span className="text-white font-semibold text-lg">{product.name}</span>
                            <span className="text-white">Precio: {price}</span>
                            <span className="text-white">Cantidad: {quantity}</span>
                            <span className="text-white">Subtotal: {price! * quantity!}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="bg-gray-400 rounded-lg p-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Total: ${order.total}</span>
                    <span className="text-white">Creada: {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default ShowOrders;