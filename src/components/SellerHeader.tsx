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
    <div className="w-full h-[55px] flex items-center justify-end px-5">
      <div className="flex justify-center items-center gap-4">
        <IconBellRinging size={22} />
        <Tooltip title="Need help?">
          <IconHelpHexagon size={22} />
        </Tooltip>
        <Button
          variant="outlined"
          size="small"
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
