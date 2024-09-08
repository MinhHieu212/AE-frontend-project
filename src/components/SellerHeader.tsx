import React from "react";
import { Button, Tooltip } from "@mui/material";
import { IconBellRinging, IconHelpHexagon } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { setRole } from "../store/slices/roleSlice";

const SellerHeader = () => {
  const navigate = useNavigate();
  const useDispatch = useAppDispatch();

  return (
    <div className="w-full h-[60px] flex items-center justify-end px-5">
      <div className="flex justify-center items-center gap-4">
        <IconBellRinging size={23} />
        <Tooltip title="Need help?">
          <IconHelpHexagon size={23} />
        </Tooltip>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/homepage");
            useDispatch(setRole({ user_role: "buyer" }));
          }}
        >
          View Shop
        </Button>
      </div>
    </div>
  );
};

export default SellerHeader;
