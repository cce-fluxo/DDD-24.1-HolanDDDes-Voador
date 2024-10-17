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
        ? 'bg-rosa-4 hover:""'
        : 'bg-rosa-2 hover:""';
  

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
  