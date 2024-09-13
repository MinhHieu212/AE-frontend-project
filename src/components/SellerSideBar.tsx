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
import { Divider, InputAdornment, Link, Stack, TextField } from "@mui/material";

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
}

const SellerSideBarItem = ({
  icon,
  iconActive,
  name,
  disable,
  paths,
  subItems,
}: SellerSideBarItemProps) => {
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
            isActive ? "text-black" : "text-[#77787b]"
          }`}
        >
          {name}
        </p>
        <div>
          {subItems === null ? (
            <></>
          ) : expand ? (
            <IconChevronUp className="text-[#77787b]" size={18} />
          ) : (
            <IconChevronDown className="text-[#77787b]" size={18} />
          )}
        </div>
      </div>

      {expand && subItems && (
        <div
          className={`ml-[10px] border-[0] ${
            isActive
              ? "border-l-[3px] border-solid border-black"
              : "border-none"
          }my-2 w-full cursor-pointer`}
        >
          {subItems.map((item, index) => {
            const subIsActive = item.path === location.pathname.split("/")[1];

            return (
              <div className="flex items-center">
                <Divider
                  className={`w-[15px] mb-1 ${
                    subIsActive ? "bg-black" : "invisible"
                  }`}
                />
                <div
                  onClick={() => handleRouting(item.path)}
                  key={index}
                  className={`p-2 rounded-lg mb-1 w-[90%] h-[40px] flex items-center font-[400] ${
                    subIsActive ? "bg-[#d5cfcf]" : ""
                  } px-2`}
                >
                  <p
                    className={`${
                      subIsActive ? "text-[#000000]" : "text-[#77787b]"
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
  // const navigate = useNavigate();
  return (
    <div className="w-[400px] h-[100dvh] bg-[#dcdfe0] flex flex-col justify-start items-center px-5">
      <Link href="/products" underline="none" className="w-full my-2">
        <div className="w-full flex items-center gap-3">
          <img
            src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
            alt="Company avatar"
            className="w-[60px] h-[60px] object-cover rounded-md"
          />

          <h2 className="text-black">Nasa Store</h2>
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

      <Stack className="h-[calc(100dvh-140px)] overflow-y-scroll scrollBar overflow-x-hidden w-full my-3">
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

export default SellerSideBar;

const SellerSideBar_list = [
  {
    icon: <IconHome size={23} color="#77787b" />,
    iconActive: <IconHome size={23} color="#000000" />,
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
    icon: <IconBuildingStore size={23} color="#77787b" />,
    iconActive: <IconBuildingStore size={23} color="#000000" />,
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
    icon: <IconDeviceDesktopAnalytics size={23} color="#77787b" />,
    iconActive: <IconDeviceDesktopAnalytics size={23} color="#000000" />,
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
    icon: <IconTags size={23} color="#77787b" />,
    iconActive: <IconTags size={23} color="#000000" />,
    name: "Promotion",
    disable: false,
    paths: ["promotion"],
    subItems: null,
  },
  {
    icon: <IconMessage size={23} color="#77787b" />,
    iconActive: <IconMessage size={23} color="#000000" />,
    name: "Message",
    disable: false,
    paths: ["message"],
    subItems: null,
  },
];

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   IconBuildingStore,
//   IconChevronUp,
//   IconChevronDown,
//   IconHome,
//   IconDeviceDesktopAnalytics,
//   IconTags,
//   IconMessage,
//   IconSearch,
//   IconDoorExit,
// } from "@tabler/icons-react";
// import { Divider, InputAdornment, Link, Stack, TextField } from "@mui/material";

// interface SubSellerSideBarProps {
//   name: string;
//   path: string;
//   disable: boolean;
// }

// interface SellerSideBarItemProps {
//   name: string;
//   disable: boolean;
//   icon: React.ReactNode;
//   paths: string[];
//   iconActive: React.ReactNode;
//   subItems: SubSellerSideBarProps[] | null;
//   isExpanded: boolean;
//   onToggle: () => void;
// }

// const SellerSideBarItem = ({
//   icon,
//   iconActive,
//   name,
//   disable,
//   paths,
//   subItems,
//   isExpanded,
//   onToggle,
// }: SellerSideBarItemProps) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isActive = paths.includes(location.pathname.split("/")[1]);

//   const handleRouting = (path: string) => {
//     navigate(`/${path}`);
//   };

//   return (
//     <div
//       className="w-full p-1 mb-1"
//       onClick={() =>
//         paths.length === 1 ? handleRouting(paths[0]) : onToggle()
//       }
//     >
//       <div
//         className="w-full rounded-md cursor-pointer flex justify-between h-[40px] items-center gap-3"
//         onClick={(e) => {
//           e.stopPropagation(); // Prevent click event from bubbling up
//           onToggle();
//         }}
//       >
//         <div>{isActive ? iconActive : icon}</div>
//         <p
//           className={`w-[80%] font-[400] ${
//             isActive ? "text-black" : "text-[#77787b]"
//           }`}
//         >
//           {name}
//         </p>
//         <div>
//           {subItems === null ? (
//             <></>
//           ) : isExpanded ? (
//             <IconChevronUp className="text-[#77787b]" size={18} />
//           ) : (
//             <IconChevronDown className="text-[#77787b]" size={18} />
//           )}
//         </div>
//       </div>

//       {isExpanded && subItems && (
//         <div
//           className={`ml-[10px] border-[0] ${
//             isActive
//               ? "border-l-[3px] border-solid border-black"
//               : "border-none"
//           } my-2 w-full cursor-pointer`}
//         >
//           {subItems.map((item, index) => {
//             const subIsActive = item.path === location.pathname.split("/")[1];

//             return (
//               <div className="flex items-center" key={index}>
//                 <Divider
//                   className={`w-[15px] mb-1 ${
//                     subIsActive ? "bg-black" : "invisible"
//                   }`}
//                 />
//                 <div
//                   onClick={() => handleRouting(item.path)}
//                   className={`p-2 rounded-lg mb-1 w-[90%] h-[40px] flex items-center font-[400] ${
//                     subIsActive ? "bg-[#d5cfcf]" : ""
//                   } px-2`}
//                 >
//                   <p
//                     className={`${
//                       subIsActive ? "text-[#000000]" : "text-[#77787b]"
//                     } my-0`}
//                   >
//                     {item.name}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// const SellerSideBar = () => {
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);

//   const handleToggle = (path: string) => {
//     setExpandedItem((prev) => (prev === path ? null : path));
//   };

//   return (
//     <div className="w-[400px] h-[100dvh] bg-[#dcdfe0] flex flex-col justify-start items-center px-5">
//       <Link href="/products" underline="none" className="w-full my-2">
//         <div className="w-full flex items-center gap-3">
//           <img
//             src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
//             alt="Company avatar"
//             className="w-[60px] h-[60px] object-cover rounded-md"
//           />
//           <h2 className="text-black">Nasa Store</h2>
//         </div>
//       </Link>

//       <TextField
//         variant="outlined"
//         placeholder="Search..."
//         fullWidth
//         size="small"
//         slotProps={{
//           input: {
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconSearch size={20} />
//               </InputAdornment>
//             ),
//             style: {
//               borderRadius: "5px",
//               height: "45px",
//             },
//           },
//         }}
//       />

//       <Stack className="h-[calc(100dvh-140px)] overflow-y-scroll scrollBar overflow-x-hidden w-full my-3">
//         {SellerSideBar_list.length > 0 &&
//           SellerSideBar_list.map((item, index) => (
//             <SellerSideBarItem
//               key={index}
//               icon={item.icon}
//               iconActive={item.iconActive}
//               name={item.name}
//               paths={item.paths}
//               disable={item.disable}
//               subItems={item.subItems}
//               isExpanded={expandedItem === item.paths[0]} // Only one item can be expanded
//               onToggle={() => handleToggle(item.paths[0])}
//             />
//           ))}
//       </Stack>

//       <div className="flex w-full justify-between items-center gap-3 mt-[auto] mb-2">
//         <div className="flex items-center justify-between gap-3 cursor-pointer">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfzY0jYPDNjRaFdyT7cpvSabL8l69GLcULQ&s"
//             alt="Company avatar"
//             className="w-[40px] h-[40px] rounded-full object-cover"
//           />
//           <div className="h-[50px] flex flex-col items-start justify-center">
//             <p className="font-semibold my-0">Trần Minh Hiếu</p>
//             <p className="text-[gray] text-sm my-0">lana@treat.com</p>
//           </div>
//         </div>
//         <IconDoorExit color="gray" size={22} className="cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default SellerSideBar;

// const SellerSideBar_list = [
//   {
//     icon: <IconHome size={23} color="#77787b" />,
//     iconActive: <IconHome size={23} color="#000000" />,
//     paths: ["manager-products", "manager-orders", "manager-customer"],
//     name: "Page manager",
//     disable: false,
//     subItems: [
//       {
//         path: "manager-products",
//         name: "Product manager",
//         disable: false,
//       },
//       {
//         path: "manager-orders",
//         name: "Order manager",
//         disable: true,
//       },
//       {
//         path: "manager-customer",
//         name: "Customer manager",
//         disable: true,
//       },
//     ],
//   },
//   {
//     icon: <IconBuildingStore size={23} color="#77787b" />,
//     iconActive: <IconBuildingStore size={23} color="#000000" />,
//     paths: ["products", "orders", "customer"],
//     name: "My shop",
//     disable: false,
//     subItems: [
//       {
//         path: "products",
//         name: "Products",
//         disable: false,
//       },
//       {
//         path: "orders",
//         name: "Order",
//         disable: true,
//       },
//       {
//         path: "customer",
//         name: "Customer",
//         disable: true,
//       },
//     ],
//   },
//   {
//     icon: <IconDeviceDesktopAnalytics size={23} color="#77787b" />,
//     iconActive: <IconDeviceDesktopAnalytics size={23} color="#000000" />,
//     name: "Business analytics",
//     disable: false,
//     paths: ["busines-product", "busines-order", "busines-customer"],
//     subItems: [
//       {
//         path: "busines-product",
//         name: "Business Product",
//         disable: true,
//       },
//       {
//         path: "busines-order",
//         name: "Business Order",
//         disable: true,
//       },
//       {
//         path: "busines-customer",
//         name: "Business Customer",
//         disable: true,
//       },
//     ],
//   },
//   {
//     icon: <IconTags size={23} color="#77787b" />,
//     iconActive: <IconTags size={23} color="#000000" />,
//     name: "Discount code",
//     disable: false,
//     paths: ["discount"],
//     subItems: null,
//   },
//   {
//     icon: <IconMessage size={23} color="#77787b" />,
//     iconActive: <IconMessage size={23} color="#000000" />,
//     name: "Support",
//     disable: false,
//     paths: ["support"],
//     subItems: null,
//   },
// ];
