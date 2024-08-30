import React from "react";
import SideBar from "./component/SideBar";

interface OwnerLayoutProps {
  children: React.ReactNode;
}

const OwnerLayout = ({ children }: OwnerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex items-center justify-center">
      <SideBar />
      <div className="w-[100%] h-[100dvh]">{children}</div>
    </div>
  );
};

export default OwnerLayout;
