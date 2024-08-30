import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  IconBuildingStore,
  IconChevronUp,
  IconChevronDown,
  IconHome,
  IconDeviceDesktopAnalytics,
  IconTags,
  IconMessage,
  IconSearch,
  IconDoorExit,
} from "@tabler/icons-react";
import { Avatar, Input, InputAdornment, Stack, TextField } from "@mui/material";

interface SubSideBarProps {
  name: string;
  path: string;
  disable: boolean;
}

interface SideBarItemProps {
  name: string;
  disable: boolean;
  icon: React.ReactNode;
  path: string[];
  iconActive: React.ReactNode;
  subItems: SubSideBarProps[] | null;
}

const SideBarItem = ({
  icon,
  iconActive,
  name,
  disable,
  path,
  subItems,
}: SideBarItemProps) => {
  const location = useLocation();
  const [expand, setExpand] = useState<boolean>(
    path.includes(location.pathname.split("/")[1])
  );

  const isActive = path.includes(location.pathname.split("/")[1]);

  return (
    <div className="w-full p-1 mb-1">
      <div
        className="w-full rounded-md cursor-pointer flex justify-between h-[40px] items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>{isActive ? iconActive : icon}</div>
        <p
          className={`w-[80%] font-medium ${
            isActive ? "text-black" : "text-[#a9adb9]"
          }`}
        >
          {name}
        </p>
        <div>
          {subItems === null ? (
            <></>
          ) : expand ? (
            <IconChevronUp className="text-[#a9adb9]" size={18} />
          ) : (
            <IconChevronDown className="text-[#a9adb9]" size={18} />
          )}
        </div>
      </div>

      {expand && subItems && (
        <div className="pl-[12%] my-2 w-full cursor-pointer">
          {subItems.map((item, index) => {
            const subIsActive = item.path === location.pathname.split("/")[1];

            return (
              <div
                key={index}
                className={`p-2 rounded-lg mb-1 w-full h-[40px] flex items-center font-medium ${
                  subIsActive ? "bg-white" : "bg-[#eef3ff]"
                } px-2`}
              >
                <p
                  className={`${
                    subIsActive ? "text-[#099cff]" : "text-[#a9adb9]"
                  }`}
                >
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  // const navigate = useNavigate();
  return (
    <div className="w-[400px] h-[100dvh] bg-[#eef3ff] flex flex-col justify-start items-center px-5">
      <div className="flex justify-between items-center gap-3 mr-[auto]">
        <img
          src="https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Company avatar"
          className="w-[45px] h-[45px] rounded-lg"
        />

        <h2 className="text-[blue]">Accessed</h2>
      </div>

      <TextField
        variant="outlined"
        placeholder="Search..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size={20} />
            </InputAdornment>
          ),
          style: {
            height: "42px",
            borderRadius: "8px",
            border: "lightgray",
          },
        }}
      />

      <Stack className="overflow-scroll w-full my-3">
        {sidebar_list.length > 0 &&
          sidebar_list.map((item, index) => (
            <SideBarItem
              key={index}
              icon={item.icon}
              iconActive={item.iconActive}
              name={item.name}
              path={item.path}
              disable={item.disable}
              subItems={item.subItems}
            />
          ))}
      </Stack>

      <div className="flex w-full justify-between items-center gap-3 mt-[auto] mb-2">
        <div className="flex items-center justify-between gap-2 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1724881470846-fa57b781af51?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company avatar"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="h-[50px]">
            <p className="font-semibold h-[25px] my-0">Trần Minh Hiếu</p>
            <p className="text-[gray] text-sm h-[25px] my-0">lana@treat.com</p>
          </div>
        </div>
        <IconDoorExit color="gray" size={20} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBar;

const sidebar_list = [
  {
    icon: <IconHome size={23} color="#a9adb9" />,
    iconActive: <IconHome size={23} color="#099cff" />,
    path: ["manager-products", "manager-orders", "manager-customer"],
    name: "Page manager",
    disable: false,
    subItems: [
      {
        path: "manager-products",
        name: "Product manager",
        disable: false,
      },
      {
        path: "manager-orders",
        name: "Order manager",
        disable: true,
      },
      {
        path: "manager-customer",
        name: "Customer manager",
        disable: true,
      },
    ],
  },
  {
    icon: <IconBuildingStore size={23} color="#a9adb9" />,
    iconActive: <IconBuildingStore size={23} color="#099cff" />,
    path: ["products", "orders", "customer"],
    name: "My shop",
    disable: false,
    subItems: [
      {
        path: "products",
        name: "Product",
        disable: false,
      },
      {
        path: "orders",
        name: "Order",
        disable: true,
      },
      {
        path: "customer",
        name: "Customer",
        disable: true,
      },
    ],
  },
  {
    icon: <IconDeviceDesktopAnalytics size={23} color="#a9adb9" />,
    iconActive: <IconDeviceDesktopAnalytics size={23} color="#099cff" />,
    name: "Business analytics",
    disable: false,
    path: ["busines-product", "busines-order", "busines-customer"],
    subItems: [
      {
        path: "busines-product",
        name: "Business Product",
        disable: true,
      },
      {
        path: "busines-order",
        name: "Business Order",
        disable: true,
      },
      {
        path: "busines-customer",
        name: "Business Customer",
        disable: true,
      },
    ],
  },
  {
    icon: <IconTags size={23} color="#a9adb9" />,
    iconActive: <IconTags size={23} color="#099cff" />,
    name: "Promotion",
    disable: false,
    path: ["promotion"],
    subItems: null,
  },
  {
    icon: <IconMessage size={23} color="#a9adb9" />,
    iconActive: <IconMessage size={23} color="#099cff" />,
    name: "Message",
    disable: false,
    path: ["message"],
    subItems: null,
  },
];
