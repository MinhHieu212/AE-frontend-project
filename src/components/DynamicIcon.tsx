import React from "react";
import * as MuiIcons from "@mui/icons-material";
import { SvgIconProps } from "@mui/material/SvgIcon";

type IconName = keyof typeof MuiIcons;

interface DynamicIconProps {
  iconName: IconName | string;
  size?: string | number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size }) => {
  if (iconName in MuiIcons) {
    const IconComponent = MuiIcons[(iconName as IconName) || "Home"];
    return <IconComponent fontSize={size as SvgIconProps["fontSize"]} />;
  }
  return null;
};

export default DynamicIcon;
