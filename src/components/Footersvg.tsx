import AbitabLogo from '@/svg/abitab.svg'
import BrouLogo from '@/svg/brou.svg'
import MasterCardLogo from '@/svg/mastercard.svg'
import SantanderLogo from '@/svg/santander.svg'
import VisaLogo from '@/svg/visa.svg'
import Image from 'next/image'

const Footersvg = () => {
    return (
        <div className='flex items-center justify-center gap-x-2'>
        <MasterCardLogo width={120} height={90} quality={50} loading='lazy'/>
        <VisaLogo width={100} height={70} className='mt-4' quality={50} loading='lazy'/>
        <SantanderLogo width={140} height={50} className='mb-4'  quality={50} loading='lazy'/>
        <BrouLogo className='bg-white' width={67} height={24}  quality={50} loading='lazy'/>
        <Image src="https://asya.uy/Abitab.png" quality={50} alt="abitab" loading='lazy' width={100} height={80} style={{ width: 'auto', height: 'auto' }}  className='ml-2'/>
    </div>
    );
  };
  
  export default Footersvg;