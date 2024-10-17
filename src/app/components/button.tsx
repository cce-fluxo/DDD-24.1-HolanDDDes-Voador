import Link from "next/link";

type ButtonProps = {
    href?: string;
    text: string;
    variant: 'primary' | 'secundary';
    type?: 'button' | 'submit'; // Adiciona o tipo 'submit' aqui
    onClick?: () => void;
  };
  
  export default function Button({ href, text, variant = 'primary', type = 'button', onClick }: ButtonProps) {
    const baseStyle = "w-full py-[16px] rounded-[12px] text-xl font-normal leading-[24px] font-poppins text-white";
  
    const variantStyle =
      variant === 'primary'
        ? 'bg-[#3ea59f] hover:bg-[#32847f]'
        : 'bg-[#589b97a1] hover:bg-[#4e8986a1]';
  

    if (href) {
      return (
        <Link href={href} passHref className='w-full'>
          <button type={type} onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
            {text}
          </button>
        </Link>
      );
    }
  
    return (
      <button type={type} onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
        {text}
      </button>
    );
  }
  