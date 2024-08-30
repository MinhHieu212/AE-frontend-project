import { Button, Tooltip } from "@mui/material";
import { IconBellRinging, IconHelpHexagon } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OwnerHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[70px] flex items-center justify-end px-5">
      <div className="flex justify-center items-center gap-4">
        <IconBellRinging size={23} />
        <Tooltip title="Need help?">
          <IconHelpHexagon size={23} />
        </Tooltip>
        <Button variant="outlined" onClick={() => navigate("/home")}>
          View Shop
        </Button>
      </div>
    </div>
  );
};

export default OwnerHeader;
