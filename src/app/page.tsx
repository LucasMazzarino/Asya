import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsReel from "@/components/ProductsReel";
import { getServerSideUser } from "@/lib/payload-utils";
import { ICONS_HOME } from "../config/index";
import { cookies } from "next/headers";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";

const Home = async () => {

  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <>
    <Banner />
      <MaxWidthWrapper>
      <div className="bg-background flex items-center justify-center mt-4">
      <div className="bg-primary text-primary-foreground px-8 py-4 rounded-lg">
        <h1 className="text-3xl font-bold text-primary-foreground">Asya - Importador mayorista en Uruguay</h1>
        <p className="text-lg mt-2">
          Ofrecemos una amplia gama de productos de calidad a precios competitivos para negocios en todo el país.
        </p>
      </div>
    </div>
        <ProductsReel query={{ sort: "desc", limit: 5 }} user={user} title="Nuevos Productos" href="/product" />
      </MaxWidthWrapper>

      <section className="border-t w-full py-12 md:py-24 lg:py-32 bg-slate-100">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">   
          <h2 className="text-3xl tracking-tighter md:text-4xl/tight">Beneficios clave</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Descubre lo que puedes obtener al usar nuestra plataforma.
          </p>
        </div>
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 
          sm:gap-x-6 lg:grid-cols-3 lg:gap-x-1 lg-gap-y-0 justify-start items-start">
            {ICONS_HOME.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900">
                    {<perk.Icon className="w-1/3 h-1/3"/>}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 mt-3">
                  <h3 className="text-xl">
                    {perk.name}
                  </h3>
                  <p className="mt-3 max-w-[300px] text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      <Contact />
    </>
  );
};

export default Home;
