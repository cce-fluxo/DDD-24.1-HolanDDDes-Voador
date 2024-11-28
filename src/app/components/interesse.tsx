import Image, { StaticImageData } from "next/image";

interface InteresseProps {
    image: StaticImageData
    text: string
}


const Interesse =  ({ image, text,}: InteresseProps) => {
    return(
        <div className=" flex align-middle items-center gap-5 justify-center w-[239px] h-[56px] bg-branco-2 rounded-lg ">
            <Image src={image} className=" w-[40px] h-[36px]" alt=""></Image>
            <p className="font-readex-pro text-cinza-3 font-normal leading-10 text-[24px]">{text}</p>
        </div>
    )
}

export default Interesse