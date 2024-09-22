import React, { useState } from "react";
import { Box, Button, Divider, Grid2, Input, Typography } from "@mui/material";

const ProductDetailsBottom = () => {
  return (
    <div className="w-full h-full max-w-[1430px] px-10 py-5 ">
      <h1 className="flex justify-center">As seen on</h1>
      <div className="flex items-center justify-center gap-[calc((1350px-(420px*3))/2)] pb-8">
        <div className="h-40 flex shadow-lg items-center justify-center w-[420px]">
          <img
            className="h-40 rounded-lg justify-center"
            src="https://logos-world.net/wp-content/uploads/2022/12/CNET-Logo.png"
            alt="CNET"
          />
        </div>
        <div className="h-40 flex shadow-lg justify-center w-[420px]">
          <img
            className="rounded-lg"
            src="https://i.pinimg.com/originals/9d/ce/75/9dce756b3a70bedcdb9310be605c4ac6.png"
            alt="The Verge"
          />
        </div>
        <div className="h-40 flex shadow-lg justify-center w-[420px]">
          <img
            className="rounded-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLkPzsOXTTC0pAD9da1nhnbm67ZIaxc-PRw&s" 
            alt="Time"
          />
        </div>
      </div>
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full text-start">
        <p className="text-lg font-semibold mb-0">
          Free gift with your 1st order
        </p>
        <p className="text-lg text-gray-500 mt-0 mb-6">
          Join our newsletter to claim it
        </p>
        <div className="flex gap-2.5">
          <Input
            type="text"
            placeholder="Email address"
            className="bg-white text-black border border-gray-300 rounded-lg p-2 w-80"
          />
          <Button variant="outlined" className="bg-blue-400 text-white px-4 rounded-lg hover:bg-[#2474cf] hover:text-white">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsBottom;
