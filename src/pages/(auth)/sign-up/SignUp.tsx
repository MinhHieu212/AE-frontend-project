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

const SignUp = () => {
  const [needHelp, setNeedHelp] = useState(false);
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
          <Typography variant="h5" className="font-bold mb-1">
            Create account
          </Typography>
          <Typography variant="body2" className="my-2">
            Your name
          </Typography>
          <FormControl className="w-full mb-3">
            <OutlinedInput size="small" placeholder="First and last name" />
          </FormControl>
          <Typography variant="body2" className="my-2">
            Mobile number or email
          </Typography>
          <FormControl className="w-full mb-3">
            <OutlinedInput size="small" />
          </FormControl>
          <Typography variant="body2" className="my-2">
            Password
          </Typography>
          <FormControl className="w-full mb-3">
            <OutlinedInput
              type="password"
              size="small"
              placeholder="At least 6 characters"
            />
          </FormControl>
          <Typography variant="body2" className="my-2">
            Re-enter password
          </Typography>
          <FormControl className="w-full mb-3">
            <OutlinedInput type="password" size="small" />
          </FormControl>
          <Button
            className="w-full bg-darkGreen text-white rounded-md p-3 h-[40px] mb-5 capitalize"
            onClick={() => navigate("/")}
          >
            Create your Nasastore account
          </Button>
          <Typography variant="body2" className="my-0 text-[12px] mb-3">
            By creating an account, you agree to Nasastore's{" "}
            <MuiLink component={Link} to="">
              Conditions of Use
            </MuiLink>{" "}
            and{" "}
            <MuiLink component={Link} to="">
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
            <MuiLink component={Link} to="" className="text-sm">
              Need help?
            </MuiLink>
          </Box>
          {needHelp && (
            <Box className="ml-7 mt-1">
              <Typography variant="body2" className="mb-1">
                <MuiLink component={Link} to="">
                  Forgot your password?
                </MuiLink>
              </Typography>
              <Typography variant="body2">
                <MuiLink component={Link} to="">
                  Other issues with sign-up
                </MuiLink>
              </Typography>
            </Box>
          )}
        </Box>
        <Divider className="my-5 w-full" />
        <Typography variant="body2" className="text-center">
          Already have an account?{" "}
          <MuiLink component={Link} to="/sign-in">
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
