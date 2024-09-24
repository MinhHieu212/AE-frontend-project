import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import nasa_logo from "../../../assest/images/nasa_gray.png";
import { useAppDispatch } from "../../../store/store";
import { setRole } from "../../../store/slices/roleSlice";

const SellerSignIn = () => {
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box className="w-full flex items-start justify-center pt-10">
      <Box className="flex flex-col items-center max-w-[370px] p-3">
        <Box className="flex items-center justify-center gap-1 my-2 cursor-pointer w-full mb-2 pr-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/nasa_gray.png` || nasa_logo}
            alt="Company avatar"
            className="w-[65px] h-[65px] object-contain rounded-md"
          />
          <h2 className="text-[#4e6e9c] text-[25px] ">Nasastore Business</h2>
        </Box>
        <Box className="border-2 border-solid border-gray-200 p-4 rounded-lg flex flex-col justify-center shadow-sm">
          <p className="font-bold text-[24px] my-0 mb-1 text-[#4e6e9c]">
            Sign in with business credentials
          </p>
          <p className="font-nomal text-sm my-0 mt-2">
            Emails or mobile phone number
          </p>
          <FormControl className="w-full my-0 mt-1 mb-3">
            <OutlinedInput size="small" />
          </FormControl>
          <p className="font-nomal text-sm my-0">Password</p>
          <FormControl className="w-full my-0 mb-5">
            <OutlinedInput size="small" type="password" />
          </FormControl>
          <Button
            className="w-full bg-[#4e6e9c] text-white rounded-md p-3 h-[40px] mb-5 capitalize"
            onClick={() => {
              useDispatch(setRole({ user_role: "seller" }));
              navigate("/products");
            }}
          >
            Continue
          </Button>
          <p className="my-0 text-[12px] mb-3">
            By continuing, you agree to Nasastore's{" "}
            <Link className="text-blue-300" to="">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link className="text-blue-300" to="">
              Privacy Notice.
            </Link>
          </p>
          <Box
            className="flex items-center justify-start gap-2"
            onClick={() => setNeedHelp((prev) => !prev)}
          >
            {!needHelp ? (
              <IconChevronRight size={18} color="#cca7f2" />
            ) : (
              <IconChevronDown size={18} color="#cca7f2" />
            )}
            <Link className="text-blue-300 text-sm" to="">
              Need help
            </Link>
          </Box>
          {needHelp && (
            <p className="my-0 mt-1 ml-7 text-sm">
              <Link className="text-blue-300" to="">
                Fogot your password
              </Link>
            </p>
          )}
          {needHelp && (
            <p className="my-0 mt-1 ml-7 text-sm">
              <Link className="text-blue-300" to="">
                Other issue with sign in
              </Link>
            </p>
          )}
          <Divider className="my-5" />
          <p className="my-0 py-1 text-sm font-medium">Are you customer?</p>
          <Link to="/sign-in" className="text-[12px] text-blue-300">
            Go to shop
          </Link>
        </Box>
        <Box className="flex items-center justify-center my-5 gap-3">
          <Divider className="w-[80px]" />
          <span className="text-[12px]">New to Nasastore</span>
          <Divider className="w-[80px]" />
        </Box>
        <Button
          variant="outlined"
          className="capitalize w-full border-[#4e6e9c] text-[#4e6e9c] h-[40px]"
          onClick={() => navigate("/seller/sign-up")}
        >
          Create your Nasastore account
        </Button>
      </Box>
    </Box>
  );
};

export default SellerSignIn;
