import React from "react";
import SideBar from "./components/OwnerSideBar";
import { Stack } from "@mui/material";
import Header from "./components/OwnerHeader";
import OwnerHeader from "./components/OwnerHeader";

interface OwnerLayoutProps {
  children: React.ReactNode;
}

const OwnerLayout = ({ children }: OwnerLayoutProps) => {
  return (
    <div className="w-[100dvw] h-[100dvh] flex items-center justify-center overflow-hidden">
      <SideBar />
      <Stack className="w-full">
        <OwnerHeader />
        <div className="w-[100%] h-[calc(100dvh-60px)]">{children}</div>
      </Stack>
    </div>
  );
};

export default OwnerLayout;
