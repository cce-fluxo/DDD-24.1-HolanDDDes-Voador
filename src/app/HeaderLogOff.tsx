import Image from "next/image";
import Link from "next/link";
const LogOffHeader = () => {
  return (
    <header className="bg-branco flex fixed top-0 left-0 right-0 px-10 py-6 border-b border-cinza-2 font-poppins font-medium justify-between items-center text-preto z-50">
      <Link href={"/"} className="flex items-end gap-4">
        <Image src="/logo.png" height={38} width={38} alt="logo" />
        <h1 className="text-2xl">BonVoyage</h1>
      </Link>
      <div className="flex items-center gap-4">
        <p className="text-xl">Já é um parceiro?</p>

        <Link
          href={"/login"}
          className="w-[104px] bg-rosa-4 h-[55px] flex flex-col rounded-[10px] gap-[10px] items-center justify-center text-center hover:bg-laranja"
        >
          <h2 className="font-work_sans text-branco font-bold text-[20px] leading-[23.46px]">
            Login
          </h2>
        </Link>
      </div>
    </header>
  );
};

export default LogOffHeader;
