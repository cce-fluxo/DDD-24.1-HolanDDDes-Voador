// components/ProfileImage.tsx
import Image from 'next/image';
import xPopImage from '../../../public/x_pop.png';

const XPop = () => {
    return (
        <Image 
            src={xPopImage} 
            alt="Fechar" 
            width={20} 
            height={20} 
        />
    );
}

export default XPop;
