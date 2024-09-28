import React from "react";
import { Button, TextField } from "@mui/material";

const ProdBottom = () => {
  return (
    <div className="w-full max-w-[1300px] px-10 py-5">
      <h2 className="flex justify-center">As seen on</h2>
      <div className="flex items-center justify-between gap-4 pb-8">
        <div className="h-40 flex shadow-lg items-center justify-center w-[30%]">
          <img
            className="h-40 rounded-lg justify-center"
            src="https://logos-world.net/wp-content/uploads/2022/12/CNET-Logo.png"
            alt="CNET"
          />
        </div>
        <div className="h-40 flex shadow-lg justify-center w-[30%]">
          <img
            className="rounded-lg"
            src="https://i.pinimg.com/originals/9d/ce/75/9dce756b3a70bedcdb9310be605c4ac6.png"
            alt="The Verge"
          />
        </div>
        <div className="h-40 flex shadow-lg justify-center w-[30%]">
          <img
            className="rounded-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLkPzsOXTTC0pAD9da1nhnbm67ZIaxc-PRw&s"
            alt="Time"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-[30%] h-full text-start">
          <p className="text-lg font-semibold mb-2">
            Free gift with your 1st order
          </p>
          <p className="text-gray-500 mt-0 mb-6 text-sm">
            Join our newsletter to claim it
          </p>
          <div className="flex gap-2.5 items-center">
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
            />
            <Button
              variant="outlined"
              className="bg-darkGreen h-[40px] mt-2 text-white px-5 rounded-lg capitalize"
            >
              Subscribe
            </Button>
          </div>
        </div>
        <img
          className=" h-[200px] w-[65%] rounded-lg object-fill shadow-md"
          src="https://kredivocorp.com/wp-content/uploads/2021/03/Samsung-financing-web-banner.jpg"
          alt="Time"
        />
      </div>
    </div>
  );
};

export default ProdBottom;
