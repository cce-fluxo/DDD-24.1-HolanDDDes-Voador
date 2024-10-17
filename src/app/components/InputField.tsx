type InputFieldProps = {
  field: any;
  form: any; 
  placeholder: string;
  tittle?: string;
  type?: string;
};

export default function InputField({ field, placeholder, tittle = '', type = 'text' }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      {tittle ? <p className="text-[20px] font-medium leading-[30px] font-poppins text-[#333333]">{tittle}</p> : null}
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="w-full placeholder-[#333333] hover:bg-zinc-50 border-2 border-color-[#333333] p-[18px] rounded-[16px] text-[20px] font-normal leading-[30px] font-poppins text-[#33333380]"
      />
    </div>
  );
}
