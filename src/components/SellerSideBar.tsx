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
import { Divider, InputAdornment, Stack, TextField } from "@mui/material";
import nasa_logo from "../assest/images/nasa_gray.png";

interface SubSellerSideBarProps {
  name: string;
  path: string;
  disable: boolean;
}

interface SellerSideBarItemProps {
  name: string;
  disable: boolean;
  icon: React.ReactNode;
  paths: string[];
  iconActive: React.ReactNode;
  subItems: SubSellerSideBarProps[] | null;
  expandedItem: string;
  setExpandedItem: (value: string) => void;
}

const SellerSideBarItem = ({
  icon,
  iconActive,
  name,
  paths,
  subItems,
  expandedItem,
  setExpandedItem,
}: SellerSideBarItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = paths.includes(location.pathname.split("/")[1]);

  return (
    <div className="w-full p-1 mb-1">
      <div
        className="w-full rounded-md cursor-pointer flex justify-between h-[40px] items-center gap-3"
        onClick={() => {
          setExpandedItem(expandedItem === name ? "" : name);
        }}
      >
        <div>{isActive ? iconActive : icon}</div>
        <p
          className={`w-[80%] font-[400] ${
            isActive ? "text-[lightgray]" : "text-[#77787b]"
          }`}
        >
          {name}
        </p>
        <div>
          {subItems === null ? (
            <></>
          ) : expandedItem === name ? (
            <IconChevronUp className="text-[#77787b]" size={18} />
          ) : (
            <IconChevronDown className="text-[#77787b]" size={18} />
          )}
        </div>
      </div>

      {expandedItem === name && subItems && (
        <div
          className={`ml-[10px] border-[0] ${"border-l-[3px] border-solid border-teal"} my-2 w-full cursor-pointer`}
        >
          {subItems.map((item, index) => {
            const subIsActive = item.path === location.pathname.split("/")[1];
            return (
              <div className="flex items-center" key={index}>
                <Divider
                  className={`w-[15px] mb-1 ${
                    subIsActive ? "bg-teal" : "invisible"
                  }`}
                />
                <div
                  onClick={() => navigate(item.path)}
                  className={`p-2 rounded-lg mb-1 w-[90%] h-[40px] flex items-center font-[400] ${
                    subIsActive ? "bg-teal" : ""
                  } px-2`}
                >
                  <p
                    className={`${
                      subIsActive ? "text-[lightgray]" : "text-[#77787b]"
                    } my-0`}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SellerSideBar = () => {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<string>("");

  return (
    <div className="w-[400px] h-[100dvh] bg-darkGreen flex flex-col justify-start items-center px-5">
      <div
        className="w-full flex items-center gap-3 cursor-pointer"
        onClick={() => {
          navigate("/products");
        }}
      >
        <img
          src={nasa_logo}
          alt="Company avatar"
          className="w-[70px] h-[60px] object-cover rounded-md"
        />
        <h2 className="text-lightLime">Nasastore</h2>
      </div>

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
              background: "#21A691",
              marginTop: "20px",
              color: "white",
            },
          },
        }}
      />

      <Stack className="h-[calc(100dvh-140px)] overflow-y-scroll scrollBar overflow-x-hidden w-full my-3 mt-5">
        {SellerSideBar_list.length > 0 &&
          SellerSideBar_list.map((item, index) => (
            <SellerSideBarItem
              key={index}
              icon={item.icon}
              iconActive={item.iconActive}
              name={item.name}
              paths={item.paths}
              disable={item.disable}
              subItems={item.subItems}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
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
            <p className="font-semibold my-0 text-myGray">Trần Minh Hiếu</p>
            <p className="text-[gray] text-sm my-0">lana@treat.com</p>
          </div>
        </div>
        <IconDoorExit color="gray" size={22} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default SellerSideBar;

const SellerSideBar_list = [
  {
    icon: <IconHome size={25} color="#77787b" />,
    iconActive: <IconHome size={25} color="lightgray" />,
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
    icon: <IconBuildingStore size={25} color="#77787b" />,
    iconActive: <IconBuildingStore size={25} color="lightgray" />,
    paths: ["products", "orders", "customer"],
    name: "My shop",
    disable: false,
    subItems: [
      {
        path: "products",
        name: "Products",
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
    icon: <IconDeviceDesktopAnalytics size={25} color="#77787b" />,
    iconActive: <IconDeviceDesktopAnalytics size={25} color="lightgray" />,
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
    icon: <IconTags size={25} color="#77787b" />,
    iconActive: <IconTags size={25} color="lightgray" />,
    name: "Discount code",
    disable: false,
    paths: ["discount"],
    subItems: null,
  },
  {
    icon: <IconMessage size={25} color="#77787b" />,
    iconActive: <IconMessage size={25} color="lightgray" />,
    name: "Support",
    disable: false,
    paths: ["support"],
    subItems: null,
  },
];
