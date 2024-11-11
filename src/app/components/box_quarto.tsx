import Image from 'next/image';
import Link from 'next/link';

interface Quarto {
    id: number;
    nome: string;
    preco: number;
  }
  
  interface BoxQuartoProps {
    quartos: Quarto[];
  }
  
  export default function BoxQuarto({ quartos }: BoxQuartoProps) {
    return (
      <div className="flex overflow-x-auto gap-[16px] py-4">
        {quartos.map((quarto) => (
        <Link href={`/hotel//quarto/${quarto.id}`} key={quarto.id}>
          <div
            key={quarto.id}
            className="w-[320px] h-auto rounded-[10px] p-[32px] bg-branco-2 flex flex-col justify-center cursor-pointer"
          >
            <div className="w-full h-auto gap-[16px]">
              <div className="w-full h-[235px] rounded-[10px] bg-branco-3 flex justify-center items-center">
                <div className="w-[243px] h-[36px] gap-[12px] flex justify-center items-center">
                  <Image
                    src="/hotel_image.png"
                    width={123.5}
                    height={104.5}
                    alt="Hotel"
                  />
                </div>
              </div>
  
              <h4 className="font-poppins text-[24px] font-medium leading-[66px] flex whitespace-nowrap text-preto">
                {quarto.nome}
              </h4>
              <div className="w-full flex flex-col justify-end items-center">
                <p className="font-work-sans font-normal text-[10px] -tracking-2 leading-[11.73px] text-cinza-3">
                  por noite:
                </p>
                <h3 className="font-readex-pro font-medium text-[32px] leading-10 text-cinza-2">
                  R$ {quarto.preco.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    );
  }  