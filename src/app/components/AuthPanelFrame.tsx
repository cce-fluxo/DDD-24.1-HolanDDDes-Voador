import React from "react";

const AuthPanelFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center p-11 w-2/5 rounded-t-3xl bg-branco shadow-custom">
      {children}
    </div>
  );
};

export default AuthPanelFrame;
