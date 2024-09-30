import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import nasa_logo from "../../../assests/images/nasa_gray.png";

const SellerSignUp = () => {
  return (
    <Box className="w-full flex items-start justify-center pb-10">
      <Box className="flex flex-col items-center max-w-[370px] p-3">
        <Box className="flex items-center justify-center gap-1 my-2 cursor-pointer w-full mb-2 pr-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/accessed_logo.png`}
            alt="Company avatar"
            className="w-[55px] h-[55px] object-cover rounded-md"
          />
          <h2 className="text-[#4e6e9c] text-[25px] ">Accessed Business</h2>
        </Box>
        <Box className="border-2 border-solid border-gray-200 p-4 rounded-lg flex flex-col justify-center w-full shadow-sm">
          <Typography variant="h5" className="font-bold mb-4 text-[#4e6e9c]">
            Create your Accessed Business account
          </Typography>
          <form onSubmit={() => {}}>
            <p className="font-nomal text-sm my-0 mt-2">Business Name</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" />
            </FormControl>

            <p className="font-nomal text-sm my-0 mt-2">Email</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" type="email" />
            </FormControl>

            <p className="font-nomal text-sm my-0 mt-2">Password</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" type="password" />
            </FormControl>

            <p className="font-nomal text-sm my-0 mt-2">Confirm Password</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" type="password" />
            </FormControl>

            <p className="font-nomal text-sm my-0 mt-2">Phone Number</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" />
            </FormControl>

            <p className="font-nomal text-sm my-0 mt-2">Business Address</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" />
            </FormControl>

            <p className="font-nomal text-sm my-0 mt-2">Tax ID / VAT Number</p>
            <FormControl className="w-full my-0 mb-3">
              <OutlinedInput size="small" />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-4 bg-[#4e6e9c] capitalize"
            >
              Create your Accessed Business account
            </Button>
          </form>
          <Typography variant="body2" className="mt-3 text-center">
            By creating an account, you agree to Accessed's{" "}
            <Link className="text-blue-300" to="/conditions">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link className="text-blue-300" to="/privacy">
              Privacy Notice
            </Link>
            .
          </Typography>
        </Box>
        <Divider className="my-4 w-full" />
        <Typography variant="body2" className="text-center">
          Already have an account?{" "}
          <Link to="/seller/sign-in" className="text-blue-300">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SellerSignUp;
