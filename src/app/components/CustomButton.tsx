import React from "react";

interface CustomButtonProps {
  handleClick: () => void;
  text: string;
  classnameText?: string;
  classnameButton?: string;
  children?: any;
}

const CustomButton = ({
  handleClick,
  text,
  classnameText,
  classnameButton,
  children,
}: CustomButtonProps) => {
  return (
    <button className={`${classnameButton}`} onClick={handleClick}>
      <span className={`${classnameText}`}>{text}</span>
      {children}
    </button>
  );
};

export default CustomButton;
