import AbitabLogo from '@/svg/abitab.svg'
import BrouLogo from '@/svg/brou.svg'
import MasterCardLogo from '@/svg/mastercard.svg'
import SantanderLogo from '@/svg/santander.svg'
import VisaLogo from '@/svg/visa.svg'
import MPLogo from '@/svg/mercadopago.svg'
import Image from 'next/image'

const Footersvg = () => {
    return (
        <div className='grid grid-cols-2 ml-8 gap-4 items-center justify-center mb-4 md:flex md:gap-x-2'>
        <MasterCardLogo width={80} height={40} quality={50} loading='lazy'/>
        <Image src="/mercadopago.png" alt="mercado pago" width={120} height={80}/>
        <VisaLogo width={100} height={40}  quality={50} loading='lazy'/>
        <SantanderLogo width={150} height={50} quality={50} loading='lazy'/>
        <BrouLogo className='bg-white' width={87} height={30}  quality={50} loading='lazy'/>
        <Image src="/Abitab.png" quality={50} alt="abitab" loading='lazy' width={100} height={80} style={{ width: 'auto', height: 'auto' }}  className='ml-2'/>
    </div>
    );
  };
  
  export default Footersvg;