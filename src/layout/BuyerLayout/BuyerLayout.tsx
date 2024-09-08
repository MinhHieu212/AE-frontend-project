import React from "react";
import BuyerHeader from "./components/BuyerHeader";
import BuyerFooter from "./components/BuyerFooter";

interface BuyerLayoutProps {
  children: React.ReactNode;
  showFooter: boolean;
}

const BuyerLayout = ({ children, showFooter = false }: BuyerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col items-center justify-start overflow-hidden">
      <BuyerHeader />
      <div className="w-[100%] h-[calc(100dvh-60px)] scrollBar overflow-y-scroll">
        {children}
        {showFooter && <BuyerFooter />}
      </div>
    </div>
  );
};

export default BuyerLayout;
