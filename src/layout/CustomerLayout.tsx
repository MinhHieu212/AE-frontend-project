import React from "react";
import SideBar from "./component/SideBar";
import Header from "./component/Header";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center">
      <Header />
      <div className="w-[100%] h-[calc(100dvh-70px)] p-3">{children}</div>
    </div>
  );
};

export default CustomerLayout;
