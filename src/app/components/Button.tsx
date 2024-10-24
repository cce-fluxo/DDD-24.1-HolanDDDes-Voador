type ButtonProps = {
    text: string;
    variant: 'primary' | 'secundary';
    type?: 'button' | 'submit'; 
    onClick?: () => void;
}

export default function Button({ text, variant = 'primary', type = "button", onClick}: ButtonProps){
    const baseStyle ="w-full py-[16px] rounded-[12px] text-xl font-normal leading-[24px] font-poppins "
    
    const variantStyle =
        variant === 'primary'
        ? 'bg-rosa-4 hover:bg-laranja text-white'
        : 'bg-rosa-1 hover:bg-rosa-2 text-laranja hover:text-white';

    return(
            <button onClick={onClick} type={type} className={`${baseStyle} ${variantStyle}`}>{text}</button>
    )
}