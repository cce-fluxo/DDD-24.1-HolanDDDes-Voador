import React from "react";

interface LoginInputProps {
  label?: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
}
const LoginInput = ({
  label,
  type,
  id,
  name,
  placeholder,
}: LoginInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-preto font-medium text-xl">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="text-preto text-xl border border-preto rounded-2xl p-4 w4/5"
      />
    </div>
  );
};

export default LoginInput;
