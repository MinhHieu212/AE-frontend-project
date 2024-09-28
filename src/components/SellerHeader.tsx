import React from "react";
import { Button, Tooltip } from "@mui/material";
import {
  IconBellRinging,
  IconHelpHexagon,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateUserField } from "../store/slices/userSlice";

const SellerHeader = () => {
  const navigate = useNavigate();
  const user_role = useAppSelector((state) => state.user.role);
  const useDispatch = useAppDispatch();

  return (
    <div className="w-full h-[55px] flex items-center justify-end px-5">
      <div className="flex justify-center items-center gap-4">
        <IconBellRinging size={22} />
        <Tooltip title="Need help?">
          <IconHelpHexagon size={22} />
        </Tooltip>
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <IconUser size={22} />
          <div
            className="flex flex-col items-start justify-start gap-0"
            onClick={() => {
              if (user_role === "seller") {
                useDispatch(updateUserField({ role: "anonymous" }));
              }
              navigate("/seller/sign-in");
            }}
          >
            <span
              className="text-gray-400 text-xs"
              style={{ fontSize: "10px" }}
            >
              {user_role === "seller" ? "Logout" : "Sign in"}
            </span>
            <span className="font-semibold text-sm">
              {user_role === "seller" ? "Hieu Minh" : "Account"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHeader;
