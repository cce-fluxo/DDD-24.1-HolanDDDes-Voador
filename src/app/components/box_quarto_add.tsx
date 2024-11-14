import Image from 'next/image';
import Link from 'next/link';

export default function BoxQuartoAdd() {
  return (
    <div className="ml-4 flex gap-[16px] py-4">
        <Link href='/hotel/quarto'>
        <div className="w-[280px] h-auto rounded-[10px] p-[32px] bg-branco-2 flex flex-col justify-center cursor-pointer">
            <div className="w-full h-auto gap-[16px]">
                <div className="w-full h-[220px] rounded-[10px] bg-branco-3 flex justify-center items-center overflow-hidden">
                    <Image
                    src={'/hotel_image.png'}
                    width={120}
                    height={150}
                    alt="Quarto"
                    />
                </div>
              
                <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">
                Adicione um quarto
                </h4>
              
                <div className="w-full flex flex-col justify-end items-center">
                    <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3">
                    por noite:
                    </p>
                <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2">
                  R$ ?
                </h3>
              </div>
            </div>
        </div>
        </Link>
    </div>
  );
}
