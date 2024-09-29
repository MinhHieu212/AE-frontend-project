import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconId, IconCamera, IconAugmentedReality } from "@tabler/icons-react";
import { constant_specifications } from "../../../../constants/constant_specification";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  IconDeviceMobile,
  IconCpu,
  IconBattery,
  IconBrandAndroid,
  IconBrandApple,
  IconDroplet,
  IconRuler,
  IconWeight,
  IconScreenShare,
  IconMicrophone,
  IconVolume,
  IconWifi,
  IconBluetooth,
  IconFingerprint,
  IconAntenna,
  IconHeadphones,
  IconBrightness,
  IconColorSwatch,
  IconPalette,
  IconShirt,
  IconMoodSmile,
  IconBook,
  IconDiamond,
} from "@tabler/icons-react";
import { updateProductField } from "../../../../store/slices/productSlice";

export const PRODUCT_ICONS = {
  GENERAL: IconId,
  CAMERA: IconCamera,
  DIMENSION: IconAugmentedReality,
  DEVICE: IconDeviceMobile,
  PROCESSOR: IconCpu,
  BATTERY: IconBattery,
  ANDROID: IconBrandAndroid,
  APPLE: IconBrandApple,
  WATER_RESISTANCE: IconDroplet,
  SIZE: IconRuler,
  WEIGHT: IconWeight,
  DISPLAY: IconScreenShare,
  MICROPHONE: IconMicrophone,
  AUDIO: IconVolume,
  WIFI: IconWifi,
  BLUETOOTH: IconBluetooth,
  FINGERPRINT: IconFingerprint,
  ANTENNA: IconAntenna,
  HEADPHONES: IconHeadphones,
  BRIGHTNESS: IconBrightness,
  COLOR: IconColorSwatch,
  MATERIAL: IconPalette,
  CLOTHING: IconShirt,
  COMFORT: IconMoodSmile,
  BOOK: IconBook,
  JEWELRY: IconDiamond,
};

type IconName = keyof typeof PRODUCT_ICONS;

interface IconComponentProps {
  name: IconName;
  size?: number;
}

const IconComponent: React.FC<IconComponentProps> = ({ name }) => {
  const Icon = PRODUCT_ICONS[name] || PRODUCT_ICONS.GENERAL;
  return <Icon size={20} />;
};

const ProdSpecification = () => {
  const useDispatch = useAppDispatch();
  const category = useAppSelector((state) => state.product.category);
  const specification = useAppSelector((state) => state.product.specification);
  const generateAccordionData = (category: {
    level_1: { name?: string | null; index?: string | null };
    level_2: { name?: string | null; index?: string | null };
  }) => {
    const primaryCategory = (category.level_1.name?.toUpperCase() ||
      category.level_2.name?.toUpperCase() ||
      "IPHONE") as keyof typeof constant_specifications;

    return Object.entries(constant_specifications[primaryCategory]).map(
      ([key, value]) => {
        return {
          title: key,
          icon: <IconComponent name={key as IconName} />,
          fields: value,
        };
      }
    );
  };

  const accordionData = generateAccordionData(category);
  // Điều chỉnh hàm cập nhật giá trị
  const handleUpdateValues = (key: string, value: string) => {
    useDispatch(
      updateProductField({
        field: "specification",
        value: { ...specification, [key]: value },
      })
    );
  };

  const renderFields = (fields: any) => (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field: any) => (
        <div key={field}>
          <p className="my-0 mb-1 text-[#797474] text-sm">{field}</p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            value={specification[field] || ""}
            onChange={(e) => handleUpdateValues(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Specifications</p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full text-sm">
        {accordionData.map((section, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="flex items-center justify-start p-1 px-0">
                {section.icon}
                <span className="font-medium text-[#797474] text-[15px] px-3 capitalize">
                  {section.title.toLowerCase()}
                </span>
              </Box>
            </AccordionSummary>
            <AccordionDetails>{renderFields(section.fields)}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default ProdSpecification;
