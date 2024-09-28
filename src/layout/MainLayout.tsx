import React from "react";
import SellerHeader from "../components/SellerHeader";
import SellerSideBar from "../components/SellerSideBar";
import BuyerFooter from "../components/BuyerFooter";
import BuyerHeader from "../components/BuyerHeader";
import { useAppSelector } from "../store/store";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const user_role = useAppSelector((state) => state.user.role);

  return (
    <div className="flex-col flex items-center justify-start w-[100dvw] h-[100dvh] overflow-hidden">
      {(user_role === "buyer" || user_role === "anonymous") && <BuyerHeader />}
      <div className="flex-row flex items-center justify-start w-full h-full">
        {user_role === "seller" && <SellerSideBar />}
        <div
          className={`flex-col w-full ${
            user_role === "seller" && "h-[100dvh]"
          } flex items-start justify-center`}
        >
          {user_role === "seller" && <SellerHeader />}
          <div
            className={`flex-col ${
              user_role === "seller"
                ? "h-[calc(100dvh-55px)]"
                : "h-[calc(100dvh-55px)]"
            } w-full overflow-y-scroll flex items-center justify-start`}
          >
            <div className="w-full">{children}</div>
            {(user_role === "buyer" || user_role === "anonymous") && (
              <BuyerFooter />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
