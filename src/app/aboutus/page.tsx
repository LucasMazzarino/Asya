import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="relative w-full min-h-screen mt-10 pb-24 md:mt-0">
      {/* Capa negra con opacidad */}
      <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
      <Image 
        src="https://cdn.asya.uy/tasas2.webp" 
        alt="about background" 
        quality={100}
        fill
        sizes="100vw"
        priority
        className="object-cover h-auto w-full min-h-screen"
      />
      <section className="relative z-20 w-full pt-12 md:pt-24 lg:pt-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src="https://cdn.asya.uy/favicon3.ico"
              alt="Favicon"
              width={140}
              height={140}
              priority
            />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-500">
                Pequeños cambios, grandes transformaciones
              </h2>
              <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Es el significado de nuestro logo.
              </h3>
              <p className="max-w-[900px] text-muted md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nos identifica como una empresa que desde sus inicios ha apostado a realizar todo en forma 
                distintiva del resto para lograr calidad y satisfacción en nuestros clientes.
                Es nuestro esfuerzo diario y cotidiano hacerlo mejor y traer para usted lo mejor.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-20 w-full py-12">
        <div className="container flex flex-col lg:flex-row items-center justify-center gap-8 px-4 text-center md:px-6 lg:text-left lg:gap-12">
          <Image
            src="https://cdn.asya.uy/juanimarlogo.webp"
            alt="juanimar Logo"
            width={150}
            height={120}
            priority
            className="h-auto w-auto mx-auto lg:mx-0"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Somos Juanimar S.A
            </h2>
            <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <strong>Juanimar</strong> es una empresa importadora comprometida en ofrecer a nuestros clientes productos de la más alta calidad, garantizando siempre los precios más competitivos del mercado. 🚢 Bajo este nombre de confianza, nos aseguramos de que cada importación cumple con los más altos estándares de calidad, para que usted pueda disfrutar de lo mejor, al mejor precio. 🌟
            </p>
          </div>
        </div>
      </section>
      <section className="relative z-20 w-full py-12">
        <div className="container flex flex-col lg:flex-row items-center justify-center gap-8 px-4 text-center md:px-6 lg:text-left lg:gap-12">
          <Image
            src="https://cdn.asya.uy/cosechas2-nobg.webp"
            alt="Cosecha Logo"
            width={200}
            height={200}
            priority
            className="h-auto w-auto mx-auto lg:mx-0"
          />
          <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Presentamos <strong>COSECHA</strong>, una marca registrada exclusiva de Juanimar y Asya. 🌿 Nos enorgullece ofrecer una línea de productos que destacan por su durabilidad y diseño, creados pensando en su comodidad y satisfacción. Desde <strong>termos</strong> hasta <strong>mates</strong>, cada producto de COSECHA está diseñado para acompañarlo en sus mejores momentos. Disfrute de la calidad superior y deléitese con lo mejor que podemos ofrecer. 🌟
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
