import Image from "next/image";
import Porta from "../../../../public/image (1).png";

export default function Box0reserva() {
  return (
    <div className=" flex items-center min-w-[420px] min-h-[140px] gap-[24px] px-[20px] bg-cinza-2 rounded-[20px]">
      <div className=" w-[136px] h-[100px]">
        <Image src={Porta} alt=""></Image>
      </div>
      <div>
        <p className=" text-[24px] text-cinza-4 font-normal font-poppins">
          Nenhuma reserva
        </p>
      </div>
    </div>
  );
}
