import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import nasa_logo from "../../../assest/images/nasa_gray.png";
import { useAppDispatch } from "../../../store/store";
import { setRole } from "../../../store/slices/roleSlice";

const SellerSignUp = () => {
  return (
    <Box className="w-full min-h-screen flex items-start justify-center mt-10 mb-10">
      <Box className="flex flex-col items-center max-w-[370px] p-3">
        <Box className="flex items-center justify-center gap-1 my-2 cursor-pointer w-full mb-2 pr-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/nasa_gray.png` || nasa_logo}
            alt="Company avatar"
            className="w-[65px] h-[65px] object-contain rounded-md"
          />
          <h2 className="text-[#4e6e9c] text-[25px] ">Nasastore Business</h2>
        </Box>
        <Box className="border-2 border-solid border-gray-200 p-4 rounded-lg flex flex-col justify-center w-full">
          <Typography variant="h5" className="font-bold mb-4 text-[#4e6e9c]">
            Create your Nasastore Business account
          </Typography>
          <form onSubmit={() => {}}>
            <TextField
              size="small"
              fullWidth
              label="Business Name"
              name="businessName"
              margin="normal"
            />
            <TextField
              size="small"
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
            />
            <TextField
              size="small"
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
            />
            <TextField
              size="small"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              margin="normal"
            />
            <TextField
              size="small"
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              margin="normal"
            />

            <TextField
              size="small"
              fullWidth
              label="Business Address"
              name="address"
              margin="normal"
            />
            <TextField
              size="small"
              fullWidth
              label="Tax ID / VAT Number"
              name="taxId"
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-4 bg-[#4e6e9c] text- capitalize"
            >
              Create your Nasastore Business account
            </Button>
          </form>
          <Typography variant="body2" className="mt-3 text-center">
            By creating an account, you agree to Nasastore's{" "}
            <Link to="/conditions">Conditions of Use</Link> and{" "}
            <Link to="/privacy">Privacy Notice</Link>.
          </Typography>
        </Box>
        <Divider className="my-4 w-full" />
        <Typography variant="body2" className="text-center">
          Already have an account?{" "}
          <Link to="/seller/sign-in" className="text-[#4e6e9c]">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SellerSignUp;
