import React from "react";

interface CustomButtonProps {
  handleClick: () => void;
  text: string;
  classnameText?: string;
  classnameButton?: string;
}

const CustomButton = ({
  handleClick,
  text,
  classnameText,
  classnameButton,
}: CustomButtonProps) => {
  return (
    <button className={`${classnameButton}`} onClick={handleClick}>
      <span className={`${classnameText}`}>{text}</span>
    </button>
  );
};

export default CustomButton;
