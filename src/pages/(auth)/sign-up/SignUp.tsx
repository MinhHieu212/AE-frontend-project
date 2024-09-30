import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import accessed_logo from "../../../assests/images/accessed_logo.png";

const SignUp = () => {
  const [needHelp, setNeedHelp] = useState(false);
  const navigate = useNavigate();

  return (
    <Box className="w-full flex items-start justify-center pt-10">
      <Box className="flex flex-col items-center max-w-[370px] p-3">
        <Box className="flex items-center justify-center gap-1 my-2 cursor-pointer w-[150px] mb-2 mr-4">
          <img
            src={
              `${process.env.PUBLIC_URL}/images/accessed_logo.png` ||
              accessed_logo
            }
            alt="Company avatar"
            className="w-[55px] h-[55px] object-cover rounded-md"
          />
          <h2 className="text-[black] text-[25px]">Accessed</h2>
        </Box>
        <Box className="border-2 border-solid border-gray-200 p-4 rounded-lg flex flex-col justify-center shadow-sm">
          <Typography variant="h5" className="font-bold mb-1">
            Create account
          </Typography>
          <p className="font-nomal text-sm my-0 mt-2"> Your name</p>
          <FormControl className="w-full mb-3">
            <OutlinedInput size="small" />
          </FormControl>
          <p className="font-nomal text-sm my-0 mt-2">Email</p>
          <FormControl className="w-full mb-3">
            <OutlinedInput size="small" />
          </FormControl>{" "}
          <p className="font-nomal text-sm my-0 mt-2">Phone</p>
          <FormControl className="w-full my-0 mb-3">
            <OutlinedInput size="small" type="number" />
          </FormControl>
          <p className="font-nomal text-sm my-0 mt-2">Password</p>
          <FormControl className="w-full mb-3">
            <OutlinedInput type="password" size="small" />
          </FormControl>
          <p className="font-nomal text-sm my-0 mt-2"> Re-enter password</p>
          <FormControl className="w-full mb-3">
            <OutlinedInput type="password" size="small" />
          </FormControl>
          <Button
            className="w-full bg-darkGreen text-white rounded-md p-3 h-[40px] mb-5 capitalize"
            onClick={() => navigate("/")}
          >
            Create your Accessed account
          </Button>
          <Typography variant="body2" className="my-0 text-[12px] mb-3">
            By creating an account, you agree to Accessed's{" "}
            <MuiLink component={Link} to="" className="text-blue-300">
              Conditions of Use
            </MuiLink>{" "}
            and{" "}
            <MuiLink component={Link} to="" className="text-blue-300">
              Privacy Notice
            </MuiLink>
            .
          </Typography>
          <Box
            className="flex items-center justify-start gap-2 cursor-pointer"
            onClick={() => setNeedHelp((prev) => !prev)}
          >
            {!needHelp ? (
              <IconChevronRight size={18} color="#cca7f2" />
            ) : (
              <IconChevronDown size={18} color="#cca7f2" />
            )}
            <MuiLink component={Link} to="" className="text-blue-300 text-sm">
              Need help?
            </MuiLink>
          </Box>
          {needHelp && (
            <Box className="ml-7 mt-1">
              <Typography variant="body2" className="mb-1">
                <MuiLink component={Link} to="" className="text-blue-300">
                  Forgot your password?
                </MuiLink>
              </Typography>
              <Typography variant="body2">
                <MuiLink component={Link} to="" className="text-blue-300">
                  Other issues with sign-up
                </MuiLink>
              </Typography>
            </Box>
          )}
        </Box>
        <Divider className="my-5 w-full" />
        <Typography variant="body2" className="text-center">
          Already have an account?{" "}
          <MuiLink component={Link} to="/sign-in" className="text-blue-300">
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
