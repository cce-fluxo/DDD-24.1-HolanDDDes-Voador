import Image from "next/image";

type CloseButtonProps = Readonly<{
    handleClick: () => void;
}>

export default function CloseButton({handleClick}: CloseButtonProps){
    return (
        <button onClick={handleClick}>
            <Image src={"/x_pop.png"} alt="" width={20} height={20}/>
        </button>
    )
}