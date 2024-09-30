import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { updateUserField } from "../../../store/slices/userSlice";

const SignIn = () => {
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box className="w-full flex items-start justify-center pt-10">
      <Box className="flex flex-col items-center max-w-[370px] p-3">
        <Box className="flex items-center justify-center gap-1 my-2 cursor-pointer w-[150px] mb-2 mr-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/accessed_logo.png`}
            alt="Company avatar"
            className="w-[55px] h-[55px] object-cover rounded-md"
          />
          <h2 className="text-[black] text-[25px]">Accessed</h2>
        </Box>
        <Box className="border-2 border-solid border-gray-200 p-4 rounded-lg flex flex-col justify-center shadow-sm">
          <p className="font-bold text-[24px] my-0 mb-1">Sign in</p>
          <p className="font-nomal text-sm my-0 mt-2">Emails</p>
          <FormControl className="w-full my-0 mb-3">
            <OutlinedInput size="small" />
          </FormControl>

          <p className="font-nomal text-sm my-0 mt-2">Password</p>
          <FormControl className="w-full mb-3">
            <OutlinedInput type="password" size="small" />
          </FormControl>
          <Button
            className="w-full bg-darkGreen text-white rounded-md mt-5 p-3 h-[40px] mb-5 capitalize"
            onClick={() => {
              useDispatch(updateUserField({ role: "buyer" }));
              navigate("/");
            }}
          >
            Continue
          </Button>
          <p className="my-0 text-[12px] mb-3">
            By continuing, you agree to Accessed's{" "}
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
          <p className="text-sm my-1 font-medium">Are you seller?</p>
          <Link className="text-blue-300 text-[12px]" to="/seller/sign-in">
            Shop on Accessed Business
          </Link>
        </Box>
        <Box className="flex items-center justify-center my-5 gap-3">
          <Divider className="w-[80px]" />
          <span className="text-[12px]">New to Accessed</span>
          <Divider className="w-[80px]" />
        </Box>
        <Button
          variant="outlined"
          className="capitalize w-full border-black text-black h-[40px]"
          onClick={() => navigate("/sign-up")}
        >
          Create your Accessed account
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
