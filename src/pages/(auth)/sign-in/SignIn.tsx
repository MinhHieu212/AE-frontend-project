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
import { useAppDispatch } from "../../../store/store";
import { setRole } from "../../../store/slices/roleSlice";

const SignIn = () => {
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box className="w-full h-[80vh] flex items-start justify-center mt-10">
      <Box className="flex flex-col items-center max-w-[370px] p-3">
        <Box className="flex items-center justify-center gap-1 my-2 cursor-pointer w-[150px] mb-2 mr-4">
          <img
            src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
            alt="Company avatar"
            className="w-[65px] h-[65px] object-cover rounded-md"
          />
          <h2 className="text-[black] text-[25px]">Nasastore</h2>
        </Box>
        <Box className="border-2 border-solid border-gray-200 p-4 rounded-lg flex flex-col justify-center">
          <p className="font-bold text-[24px] my-0 mb-1">Sign in</p>
          <p className="font-nomal text-sm my-0 mt-2">
            Emails or mobile phone number
          </p>
          <FormControl className="w-full my-0 mb-3">
            <OutlinedInput size="small" />
          </FormControl>
          <Button
            className="w-full bg-darkGreen text-white rounded-md p-3 h-[40px] mb-5 capitalize"
            onClick={() => {
              useDispatch(setRole({ user_role: "buyer" }));
              navigate("/");
            }}
          >
            Continue
          </Button>
          <p className="my-0 text-[12px] mb-3">
            By continuing, you agree to Nasastore's{" "}
            <Link to="">Conditions of Use</Link> and{" "}
            <Link to="">Privacy Notice.</Link>
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
            <Link to="" className="text-sm">
              Need help
            </Link>
          </Box>
          {needHelp && (
            <p className="my-0 mt-1 ml-7 text-sm">
              <Link to="">Fogot your password</Link>
            </p>
          )}
          {needHelp && (
            <p className="my-0 mt-1 ml-7 text-sm">
              <Link to="">Other issue with sign in</Link>
            </p>
          )}
          <Divider className="my-5" />
          <p className="text-sm my-1 font-medium">Are you seller?</p>
          <Link to="/seller/sign-in" className="text-[12px]">
            Shop on Nasastore Business
          </Link>
        </Box>
        <Box className="flex items-center justify-center my-5 gap-3">
          <Divider className="w-[80px]" />
          <span className="text-[12px]">New to Nasastore</span>
          <Divider className="w-[80px]" />
        </Box>
        <Button
          variant="outlined"
          className="capitalize w-full border-black text-black h-[40px]"
          onClick={() => navigate("/sign-up")}
        >
          Create your Nasastore account
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
