import React from "react";
import CustomerHeader from "./components/CustomerHeader";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      <CustomerHeader />
      <div className="w-[100%] h-[calc(100dvh-60px)] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default CustomerLayout;
