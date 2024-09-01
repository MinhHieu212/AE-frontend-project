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
import { InputAdornment, Link, Stack, TextField } from "@mui/material";

interface SubSideBarProps {
  name: string;
  path: string;
  disable: boolean;
}

interface SideBarItemProps {
  name: string;
  disable: boolean;
  icon: React.ReactNode;
  paths: string[];
  iconActive: React.ReactNode;
  subItems: SubSideBarProps[] | null;
}

const SideBarItem = ({
  icon,
  iconActive,
  name,
  disable,
  paths,
  subItems,
}: SideBarItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expand, setExpand] = useState<boolean>(
    paths.includes(location.pathname.split("/")[1])
  );

  const isActive = paths.includes(location.pathname.split("/")[1]);

  const handleRouting = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div
      className="w-full p-1 mb-1"
      onClick={() => (paths.length === 1 ? handleRouting(paths[0]) : {})}
    >
      <div
        className="w-full rounded-md cursor-pointer flex justify-between h-[40px] items-center gap-3"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>{isActive ? iconActive : icon}</div>
        <p
          className={`w-[80%] font-[400] ${
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
                onClick={() => handleRouting(item.path)}
                key={index}
                className={`p-2 rounded-lg mb-1 w-full h-[40px] flex items-center font-[400] ${
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
      <Link href="/products" underline="none" className="w-full my-2">
        <div className="w-full flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/918px-NASA_logo.svg.png"
            alt="Company avatar"
            className="w-[50px] h-[50px] object-cover rounded-md"
          />

          <h2 className="text-[blue]">Nasa Store</h2>
        </div>
      </Link>

      <TextField
        variant="outlined"
        placeholder="Search..."
        fullWidth
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size={20} />
              </InputAdornment>
            ),
            style: {
              borderRadius: "5px",
              height: "45px",
            },
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
              paths={item.paths}
              disable={item.disable}
              subItems={item.subItems}
            />
          ))}
      </Stack>

      <div className="flex w-full justify-between items-center gap-3 mt-[auto] mb-2">
        <div className="flex items-center justify-between gap-3 cursor-pointer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfzY0jYPDNjRaFdyT7cpvSabL8l69GLcULQ&s"
            alt="Company avatar"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div className="h-[50px] flex flex-col items-start justify-center">
            <p className="font-semibold  my-0">Trần Minh Hiếu</p>
            <p className="text-[gray] text-sm my-0">lana@treat.com</p>
          </div>
        </div>
        <IconDoorExit color="gray" size={22} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBar;

const sidebar_list = [
  {
    icon: <IconHome size={23} color="#a9adb9" />,
    iconActive: <IconHome size={23} color="#099cff" />,
    paths: ["manager-products", "manager-orders", "manager-customer"],
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
    paths: ["products", "orders", "customer"],
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
    paths: ["busines-product", "busines-order", "busines-customer"],
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
    paths: ["promotion"],
    subItems: null,
  },
  {
    icon: <IconMessage size={23} color="#a9adb9" />,
    iconActive: <IconMessage size={23} color="#099cff" />,
    name: "Message",
    disable: false,
    paths: ["message"],
    subItems: null,
  },
];
