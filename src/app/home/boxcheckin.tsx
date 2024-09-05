export default function Boxcheckin() {
    return(
        <div className=" flex min-w-[427px] mb-5 min-h-[195px] shadow-xl pl-[10px] pt-[20px] pb-[20px] pr-[40px]">
            <div className=" bg-slate-500 h-[157px] w-[157px] mr-[24px] rounded-[5px]"></div>
            <div>
                <h1 className=" text-[24px] mb-[24px] text-preto"> Nome quarto</h1>
                <p className="text-[20px] text-preto"> Nome pessoa</p>
                <p className=" text-preto"> checkin</p>
                <p className=" text-preto"> Telefone: xxxx-xxxx</p>
            </div>
        </div>
    )
}