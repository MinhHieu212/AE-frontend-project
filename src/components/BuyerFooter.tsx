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
    <div className="bg-white w-full text-black p-3 px-10">
      <Grid2 container spacing={2}>
        <Grid2
          size={3}
          className="flex flex-col items-start justify-start gap-2"
        >
          <Link href="/" underline="none" className="w-full my-2">
            <div className="w-full flex items-center gap-1">
              <img
                src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
                alt="Company avatar"
                className="w-[60px] h-[60px] object-cover rounded-md"
              />

              <h2 className="text-[black] text-[20px]">Nasastore</h2>
            </div>
          </Link>
        </Grid2>
        <Grid2
          size={1.5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-2 text-[16px]">Product</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Jewelry
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Swimwear
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Dresses
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Watches
          </Link>
        </Grid2>
        <Grid2
          size={1.5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-1 text-[15px]">Brand</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            About
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Play, win & save
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Design
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Waterproof
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Our Stores
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Shop our Instagram
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Shop our Look
          </Link>
        </Grid2>
        <Grid2
          size={1.5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-1 text-[15px]">Resources</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Ring Sizer
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Rewards
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Package
          </Link>
        </Grid2>
        <Grid2
          size={1.5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-1 text-[15px]">Support</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Color Warranty
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Start a Return
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            FAQ
          </Link>
        </Grid2>
        <Grid2
          size={1.5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-1 text-[15px]">Join us</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Careers
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Stockists
          </Link>
        </Grid2>
        <Grid2
          size={1.5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-1 text-[15px]">Social</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Instagram
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Facebook
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Youtube
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            TikTok
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            LinkedIn
          </Link>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-600 text-sm font-medium"
          >
            Pinterest
          </Link>
        </Grid2>
      </Grid2>
      <Divider className="my-6 mb-3 bg-gray-100"></Divider>
      <Box className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center gap-3">
          <Select
            id="demo-multiple-chip"
            value={currency}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <span className="text-sm font-medium">{selected}</span>
              </Box>
            )}
            className="h-[25px] w-full cursor-pointer"
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
            id="demo-multiple-chip"
            value={language}
            onChange={handleChangeLanguage}
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <span className="text-sm font-medium">{selected}</span>
              </Box>
            )}
            className="h-[25px] w-full cursor-pointer"
          >
            <MenuItem value={"English"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                English
              </Box>
            </MenuItem>
            <MenuItem value={"Spanish"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                Spanish
              </Box>
            </MenuItem>
          </Select>

          <img
            src="https://cdn2.fptshop.com.vn/svg/visa_icon_a6c024d37b.svg?w=48&q=100"
            alt=""
            className="w-[40px] h-[28px] rounded-md object-cover"
          />
          <img
            src="https://cdn2.fptshop.com.vn/svg/mastercard_icon_e336a980d8.svg?w=48&q=100"
            alt=""
            className="w-[40px] h-[28px] rounded-md object-cover"
          />
          <img
            src="https://cdn2.fptshop.com.vn/svg/zalopay_icon_f54e43f9b4.svg?w=48&q=100"
            alt=""
            className="w-[40px] h-[28px] rounded-md object-cover"
          />
          <img
            src="https://cdn2.fptshop.com.vn/svg/Property_1_apple_pay_icon_8ed897d7bb.svg?w=48&q=100"
            alt=""
            className="w-[40px] h-[28px] rounded-md object-cover"
          />
          <img
            src="https://cdn2.fptshop.com.vn/svg/kredivo_icon_9a2c105e72.svg?w=48&q=100"
            alt=""
            className="w-[40px] h-[28px] rounded-md object-cover"
          />
        </div>

        <Box className="flex items-center justify-center gap-2">
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-400 text-xs"
          >
            Terms of Service
          </Link>
          <span className="hover:underline decoration-transparent text-gray-400 text-sm">
            .
          </span>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-400 text-xs"
          >
            Privacy Poilcy
          </Link>
        </Box>
      </Box>
    </div>
  );
};
export default BuyerFooter;

const currencies = [
  { code: "AUD", symbol: "$", label: "AUD $" },
  { code: "CAD", symbol: "$", label: "CAD $" },
  { code: "EUR", symbol: "€", label: "EUR €" },
  { code: "GBP", symbol: "£", label: "GBP £" },
  { code: "USD", symbol: "$", label: "USD $" },
];
