import React from "react";
import SideBar from "./component/OwnerSideBar";
import { Stack } from "@mui/material";
import Header from "./component/OwnerHeader";
import OwnerHeader from "./component/OwnerHeader";

interface OwnerLayoutProps {
  children: React.ReactNode;
}

const OwnerLayout = ({ children }: OwnerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex items-center justify-center">
      <SideBar />
      <Stack className="w-full">
        <OwnerHeader />
        <div className="w-[100%] px-5 h-[calc(100dvh-70px)]">{children}</div>
      </Stack>
    </div>
  );
};

export default OwnerLayout;
