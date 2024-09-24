import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, TextField } from "@mui/material";
import { IconAugmentedReality, IconCamera, IconId } from "@tabler/icons-react";

export default function ProdSpecification() {
  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Specifications</p>
      <div className="border-2 border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full text-sm">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center justify-start p-1 px-0">
              <IconId size={20} />
              <span className="font-medium text-[#aca4a4] text-[15px] px-3 capitalize">
                Specification
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Display</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Processor</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Battery</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">
                  Operating system
                </p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">
                  Water Resistance
                </p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center justify-start p-1 px-0">
              <IconCamera size={20} />
              <span className="font-medium text-[#aca4a4] text-[15px] px-3 capitalize">
                Camera
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">
                  Front Camera:
                </p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Rear Camera</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center justify-start p-1 px-0">
              <IconAugmentedReality size={20} />
              <span className="font-medium text-[#aca4a4] text-[15px] px-3 capitalize">
                Dimension
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Height</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Width</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Depth</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#aca4a4] text-sm">Weight</p>
                <TextField variant="outlined" fullWidth required size="small" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
