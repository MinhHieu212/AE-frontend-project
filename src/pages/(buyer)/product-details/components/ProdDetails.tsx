import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  IconAugmentedReality,
  IconCamera,
  IconId,
  IconNotes,
} from "@tabler/icons-react";

const productDetails = {
  specification: {
    display: "6.5 inches, AMOLED",
    processor: "Snapdragon 888",
    battery: "4500mAh",
    operatingSystem: "Android 12",
    waterResistance: "IP68",
  },
  dimension: {
    height: "160.8 mm",
    width: "74.5 mm",
    depth: "7.9 mm",
    weight: "188 g",
  },
  camera: {
    front: "32 MP",
    rear: "108 MP + 12 MP + 8 MP",
  },
};

const ProdDetails = () => {
  return (
    <div className="w-full flex flex-col mt-10 shadow-md">
      {Object.entries(productDetails).map(([category, details]) => (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box className="flex items-center justify-start p-2">
              {category === "specification" ? (
                <IconId />
              ) : category === "dimension" ? (
                <IconAugmentedReality />
              ) : category === "camera" ? (
                <IconCamera />
              ) : (
                <IconNotes />
              )}
              <span className="font-medium text-[16px] px-3 capitalize">
                {category}
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(details).map(([key, value]) => (
              <Box>
                <Box
                  key={key}
                  className="py-3 flex text-[16px] items-center justify-start gap-10 capitalize"
                >
                  <span className="font-medium">{key}: </span>
                  <span className="text-gray-500">{value}</span>
                </Box>
                <Divider />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ProdDetails;
