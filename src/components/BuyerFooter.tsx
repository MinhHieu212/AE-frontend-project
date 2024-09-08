import React from "react";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { Divider, Grid2, Link } from "@mui/material";

const BuyerFooter = () => {
  return (
    <div className="w-full text-black p-3 px-10 mt-10">
      <Grid2 container spacing={2}>
        <Grid2
          size={5}
          className="flex flex-col items-start justify-start gap-2"
        >
          <Link href="/" underline="none" className="w-full my-2">
            <div className="w-full flex items-center gap-3">
              <img
                src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
                alt="Company avatar"
                className="w-[60px] h-[60px] object-cover rounded-md"
              />

              <h2 className="text-[black]">Nasa Store</h2>
            </div>
          </Link>
          <p className="m-2 text-sm">
            Support all Credit Cards and Payment Methods
          </p>
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://cdn2.fptshop.com.vn/svg/visa_icon_a6c024d37b.svg?w=48&q=100"
              alt=""
              className="w-[60px] h-[40px] object-cover"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/mastercard_icon_e336a980d8.svg?w=48&q=100"
              alt=""
              className="w-[60px] h-[40px] object-cover"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/zalopay_icon_f54e43f9b4.svg?w=48&q=100"
              alt=""
              className="w-[60px] h-[40px] object-cover"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/Property_1_apple_pay_icon_8ed897d7bb.svg?w=48&q=100"
              alt=""
              className="w-[60px] h-[40px] object-cover"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/kredivo_icon_9a2c105e72.svg?w=48&q=100"
              alt=""
              className="w-[60px] h-[40px] object-cover"
            />
          </div>
        </Grid2>
        <Grid2
          size={2}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-4">Useful Links</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            Home
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            About
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            Blog
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            Contact
          </Link>
        </Grid2>
        <Grid2
          size={2}
          className="flex flex-col items-start justify-start gap-2"
        >
          <h2 className="font-bold mb-4">My Account</h2>
          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            Orders Tracking
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            Checkout
          </Link>

          <Link
            href="/"
            className="hover:underline decoration-transparent text-gray-500 text-sm"
          >
            Wishlist
          </Link>
        </Grid2>
        <Grid2 size={3} className="flex flex-col items-end gap-2">
          <h2 className="font-bold mb-4">Contact</h2>
          <p className="my-0">+01-22-333-22-111-2</p>
          <p className="my-0">Address here, Usa</p>
          <div className="flex mt-4 space-x-4">
            <div className="border-2 border-solid border-black rounded-full p-3 w-[50px] h-[50px]">
              <Instagram className="text-black" />
            </div>
            <div className="border-2 border-solid border-black rounded-full p-3 w-[50px] h-[50px]">
              <Facebook className="text-black" />
            </div>
            <div className="border-2 border-solid border-black rounded-full p-3 w-[50px] h-[50px]">
              <Twitter className="text-black" />
            </div>
            <div className="border-2 border-solid border-black rounded-full p-3 w-[50px] h-[50px]">
              <YouTubeIcon className="text-black" />
            </div>
          </div>
        </Grid2>
      </Grid2>
      <Divider className="my-6 bg-gray-900" />
      <div className="w-full text-center mt-8">
        <p className="my-0">&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default BuyerFooter;
