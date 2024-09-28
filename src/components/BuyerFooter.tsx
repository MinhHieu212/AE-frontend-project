import React from "react";
import {
  Grid2,
  Link,
  Divider,
  Box,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconCheck } from "@tabler/icons-react";

const BuyerFooter = () => {
  const [currency, setCurrency] = React.useState("EUR");
  const [language, setLanguage] = React.useState("English");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <div className="bg-white w-full text-black p-3 px-4 sm:px-6 md:px-10 mt-5">
      <Grid2 container spacing={2}>
        <Grid2 size={{ sm: 3, md: 4, lg: 3 }} className="mb-6 sm:mb-0">
          <Link href="/" underline="none" className="w-full my-2 block">
            <div className="w-full flex items-center gap-1">
              <img
                src={`${process.env.PUBLIC_URL}/images/accessed_logo.png`}
                alt="Company avatar"
                className="w-[45px] h-[45px] object-cover rounded-md"
              />
              <h2 className="text-[green] text-[20px]">Accessed</h2>
            </div>
          </Link>
        </Grid2>

        {footerColumns.map((column, index) => (
          <Grid2
            key={index}
            size={{ sm: 3, md: 2, lg: 1.5 }}
            className="mb-4 sm:mb-0"
          >
            <h2 className="font-bold mb-2 text-[16px]">{column.title}</h2>
            {column.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href="/"
                className="hover:underline decoration-transparent text-gray-600 text-sm font-medium block mb-1"
              >
                {link}
              </Link>
            ))}
          </Grid2>
        ))}
      </Grid2>

      <Divider className="my-6 mb-3 bg-gray-100" />

      <Grid2
        container
        spacing={2}
        className="w-full mb-6"
        justifyContent="space-between"
      >
        <Grid2
          size={{ xs: 12, sm: 8 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-3"
        >
          <div className="flex items-center justify-center gap-3 xs:w-full">
            <Select
              className="h-[25px] w-full sm:w-[45%] cursor-pointer"
              value={currency}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <span className="text-sm font-medium">{selected}</span>
                </Box>
              )}
            >
              {currencies.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {option.label}
                    {currency === option.code && <IconCheck size={16} />}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            <Select
              className="h-[25px] w-full sm:w-[45%] cursor-pointer"
              value={language}
              onChange={handleChangeLanguage}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <span className="text-sm font-medium">{selected}</span>
                </Box>
              )}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </div>
          <div className="flex items-center justify-start gap-2 xs:w-full">
            {paymentMethods.map((method, index) => (
              <img
                key={index}
                src={method}
                alt=""
                className="w-[40px] h-[28px] rounded-md object-cover"
              />
            ))}
          </div>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 4 }}
          className="flex items-center justify-center md:justify-end"
        >
          <Link
            href=""
            className="hover:underline decoration-transparent text-gray-400 text-xs"
          >
            Terms of Service
          </Link>
          <span className="hover:underline decoration-transparent text-gray-400 text-sm">
            .
          </span>
          <Link
            href=""
            className="hover:underline decoration-transparent text-gray-400 text-xs"
          >
            Privacy Policy
          </Link>
        </Grid2>
      </Grid2>
    </div>
  );
};

const footerColumns = [
  {
    title: "Product",
    links: ["Jewelry", "Swimwear", "Dresses", "Watches"],
  },
  {
    title: "Brand",
    links: [
      "About",
      "Play, win & save",
      "Design",
      "Waterproof",
      "Our Stores",
      "Shop our Instagram",
      "Shop our Look",
    ],
  },
  {
    title: "Resources",
    links: ["Ring Sizer", "Rewards", "Package"],
  },
  {
    title: "Support",
    links: ["Color Warranty", "Start a Return", "Contact", "FAQ"],
  },
  {
    title: "Join us",
    links: ["Careers", "Stockists"],
  },
  {
    title: "Social",
    links: [
      "Instagram",
      "Facebook",
      "Youtube",
      "TikTok",
      "LinkedIn",
      "Pinterest",
    ],
  },
];

const currencies = [
  { code: "AUD", symbol: "$", label: "AUD $" },
  { code: "CAD", symbol: "$", label: "CAD $" },
  { code: "EUR", symbol: "€", label: "EUR €" },
  { code: "GBP", symbol: "£", label: "GBP £" },
  { code: "USD", symbol: "$", label: "USD $" },
];

const paymentMethods = [
  "https://cdn2.fptshop.com.vn/svg/visa_icon_a6c024d37b.svg?w=48&q=100",
  "https://cdn2.fptshop.com.vn/svg/mastercard_icon_e336a980d8.svg?w=48&q=100",
  "https://cdn2.fptshop.com.vn/svg/zalopay_icon_f54e43f9b4.svg?w=48&q=100",
  "https://cdn2.fptshop.com.vn/svg/Property_1_apple_pay_icon_8ed897d7bb.svg?w=48&q=100",
  "https://cdn2.fptshop.com.vn/svg/kredivo_icon_9a2c105e72.svg?w=48&q=100",
];

export default BuyerFooter;
