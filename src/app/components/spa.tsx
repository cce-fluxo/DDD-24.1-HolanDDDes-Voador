// components/ProfileImage.tsx
import Image from 'next/image';
import spaIcon from '../../../public/spa.png';

const spa = () => {
    return (
        <Image 
            src={spaIcon} 
            alt="Fechar" 
            width={20} 
            height={20} 
        />
    );
}

export default spa;
