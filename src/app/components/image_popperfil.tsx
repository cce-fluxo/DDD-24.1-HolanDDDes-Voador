// components/ProfileImage.tsx
import Image from 'next/image';
import profileImage from '../../../public/poperfil.png';

const PopPerfil = () => {
    return (
        <Image 
            src={profileImage} 
            alt="Profile" 
            width={279.92} 
            height={264.5} 
        />
    );
}

export default PopPerfil;
