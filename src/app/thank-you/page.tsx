import { getServerSideUser } from '@/lib/payload-utils';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getPayloadClient } from '@/get-payload';
import { notFound, redirect } from 'next/navigation';
import { Product, User, Order } from '@/payload-type';
import { PRODUCT_CATEGORIES } from '@/config';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import PaymentStatus from '@/components/PaymentStatus';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId as string;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders as Order[];

  if (!order) return notFound();

  const orderUserId = typeof order.user === 'string' ? order.user : (order.user as User).id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const items = order.items.map((item) => ({
    ...item,
    product: item.product as Product,
  }));

  const orderTotal = user?.customerType === 'Wholesale'
    ? items.reduce((total, item) => total + (item.product.wholesalePrice || 0) * (item.quantity || 0), 0)
    : items.reduce((total, item) => total + (item.product.price || 0) * (item.quantity || 0), 0);

  return (
    <main className="relative flex flex-col lg:flex-row lg:min-h-screen mt-12">
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-xl w-full text-center lg:text-left">
          <p className="text-sm font-medium text-primary">Orden creada con éxitos</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            ¡Gracias por tu Orden!
          </h2>
          {order._isPaid ? (
            <p className="mt-2 text-base text-white">
              Su pedido fue procesado y confirmado, los productos serán enviados a su dirección y nos pondremos en contacto con usted via WhatsApp o Correo{' '}
              {typeof order.user !== 'string' ? (
                <span className="font-medium text-white">{(order.user as User).email}</span>
              ) : null}
              .
            </p>
          ) : (
            <p className="mt-2 text-base text-white">
              Apreciamos su pedido y estamos tramitándolo actualmente. ¡Te enviaremos la confirmación muy pronto!
            </p>
          )}

          <div className="mt-16 text-sm font-medium">
            <div className="text-primary">Número de Orden</div>
            <div className="mt-2 text-white">{order.id}</div>

            <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
              {items.map(({ product, quantity }) => {
                const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
                const { image } = product.images[0];

                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="relative h-24 w-24">
                      {typeof image !== 'string' && image.url ? (
                        <Image
                          fill
                          src={image.url}
                          alt={`${product.name} image`}
                          className="flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                      ) : null}
                    </div>

                    <div className="flex-auto flex flex-col justify-between">
                      <div className="space-y-1 hidden sm:block">
                        <h3 className="text-white">{product.name}</h3>
                        <p className="my-1 text-white">Categoría: {label}</p>
                      </div>
                    </div>
                    {user?.customerType === 'Wholesale' ? (
                      <div className="flex flex-col text-end">
                        <span className="flex-none font-medium text-white">{formatPrice(product.wholesalePrice)}</span>
                        <span className="flex font-medium text-white ml-auto pr-2">Cantidad: {quantity}</span>
                        <span className="flex font-medium text-white ml-auto pr-2">Subtotal: {product.wholesalePrice * quantity!}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col text-end">
                        <span className="flex-none font-medium text-white">{formatPrice(product.price)}</span>
                        <span className="flex font-medium text-white ml-auto pr-5">Cantidad: {quantity}</span>
                        <span className="flex font-medium text-white ml-auto pr-2">Subtotal: {product.price * quantity!}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-white">
              <p className="text-base">Total</p>
              <p className="text-base">{formatPrice(orderTotal)}</p>
            </div>

            <PaymentStatus isPaid={order._isPaid} orderEmail={(order.user as User).email} orderId={order.id} />

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link href="/product" className="text-sm font-medium text-primary hover:text-orange-600">
                Continuar comprando &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-background">
        <Image
          src="https://cdn.asya.uy/thank-younbg.webp"
          alt="Thank you image"
          width={1000}
          height={600}
          className="object-cover object-center rounded-lg"
        />
      </div>
    </main>
  );
};

export default ThankYouPage;
