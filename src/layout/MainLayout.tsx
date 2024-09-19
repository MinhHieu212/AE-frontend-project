import React from "react";
import SellerHeader from "../components/SellerHeader";
import SellerSideBar from "../components/SellerSideBar";
import BuyerFooter from "../components/BuyerFooter";
import BuyerHeader from "../components/BuyerHeader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setRole } from "../store/slices/roleSlice";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const userRole = useAppSelector((state) => state.roles.user_role);
  const useDispatch = useAppDispatch();

  return (
    <div className="flex-col flex items-center justify-start w-[100dvw] h-[100dvh] overflow-hidden">
      {userRole === "buyer" && <BuyerHeader />}
      <div className="flex-row flex items-center justify-start w-full h-full">
        {userRole === "seller" && <SellerSideBar />}
        <div
          className={`flex-col w-full ${
            userRole === "seller" && "h-[100dvh]"
          } flex items-start justify-center`}
        >
          {userRole === "seller" && <SellerHeader />}
          <div
            className={`flex-col ${
              userRole === "seller"
                ? "h-[calc(100dvh-55px)]"
                : "h-[calc(100dvh-70px)]"
            } w-full overflow-y-scroll flex items-center justify-start`}
          >
            <div className="w-full">{children}</div>
            {userRole === "buyer" && <BuyerFooter />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
