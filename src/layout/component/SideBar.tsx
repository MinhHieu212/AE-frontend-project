import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconBuildingStore,
  IconChevronUp,
  IconChevronDown,
  IconHome,
  IconDeviceDesktopAnalytics,
  IconTags,
  IconMessage,
} from "@tabler/icons-react";
import { Input, Stack } from "@mui/material";

interface SubSideBarProps {
  name: string;
  path: string;
  disable: boolean;
}

interface SideBarItemProps {
  icon: React.ReactNode;
  name: string;
  disable: boolean;
  subItems: SubSideBarProps[] | null;
}

const SideBarItem = ({ icon, name, disable, subItems }: SideBarItemProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div
        className="w-full rounded-md p-2 cursor-pointer flex justify-between items-center gap-3 hover:bg-slate-300"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div>{icon}</div>
        <p className="w-[80%]">{name}</p>
        <div>
          {subItems === null ? (
            <></>
          ) : expand ? (
            <IconChevronDown />
          ) : (
            <IconChevronUp />
          )}
        </div>
      </div>

      {expand && (
        <div className="pl-[10%] w-full cursor-pointer p-2">
          {subItems &&
            subItems.map((item, index) => (
              <div key={index} className="p-3 bg-gray-200 rounded w-full my-1">
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const SideBar = () => {
  // const navigate = useNavigate();
  return (
    <div className="w-[500px] h-[100dvh] flex flex-col justify-start items-center p-3">
      <h2>Company Name</h2>
      <Input placeholder="Type in here…" className="w-full" />
      <Stack className="overflow-scroll w-full">
        {sidebar_list.length > 0 &&
          sidebar_list.map((item, index) => (
            <SideBarItem
              key={index}
              icon={item.icon}
              name={item.name}
              disable={item.disable}
              subItems={item.subItems}
            />
          ))}
      </Stack>
    </div>
  );
};

export default SideBar;

const sidebar_list = [
  {
    icon: <IconHome size={25} />,
    name: "Page manager",
    disable: false,
    subItems: [
      {
        path: "/",
        name: "Product manager",
        disable: false,
      },
      {
        path: "/",
        name: "Order manager",
        disable: true,
      },
      {
        path: "/",
        name: "Customer manager",
        disable: true,
      },
    ],
  },
  {
    icon: <IconBuildingStore size={25} />,
    name: "My shop",
    disable: false,
    subItems: [
      {
        path: "/products",
        name: "Product",
        disable: false,
      },
      {
        path: "/products",
        name: "Order",
        disable: true,
      },
      {
        path: "/products",
        name: "Customer",
        disable: true,
      },
    ],
  },
  {
    icon: <IconDeviceDesktopAnalytics size={25} />,
    name: "Business analytics",
    disable: false,
    subItems: [
      {
        path: "/",
        name: "Business Product",
        disable: true,
      },
      {
        path: "/",
        name: "Business Order",
        disable: true,
      },
      {
        path: "/",
        name: "Business Customer",
        disable: true,
      },
    ],
  },
  {
    icon: <IconTags size={25} />,
    name: "Promotion",
    disable: false,
    subItems: null,
  },
  {
    icon: <IconMessage size={25} />,
    name: "Message",
    disable: false,
    subItems: null,
  },
];
