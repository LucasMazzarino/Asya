import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar"
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asya Uruguay",
  description: "Importador Mayorista",
  openGraph: {
    title: "Asya Uruguay",
    description: "Importador Mayorista",
    url: "https://asya.uy",
    siteName: "Asya",
    images: [
      {
        url: "https://asya.uy/favicon.ico",
        width: 800,
        height: 600,
        alt: "Asya",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="es" className=" h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://asya.uy" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(
        "relative h-full font-sans antialiased",
        inter.className
        )}>
        <main className="relative flex flex-col min-h-screen bg-background">
          <Providers>
          <Navbar  />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
            <WhatsAppButton />
          </Providers>
        </main>
        <Toaster position="top-center" richColors/>
        </body>
    </html>
  );
}
