import React from "react";
import BuyerHeader from "./components/BuyerHeader";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

const BuyerLayout = ({ children }: BuyerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      <BuyerHeader />
      <div className="w-[100%] h-[calc(100dvh-60px)] scrollBar overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default BuyerLayout;
