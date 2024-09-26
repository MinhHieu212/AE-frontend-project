import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, TextField } from "@mui/material";
import { IconAugmentedReality, IconCamera, IconId } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductSpecification } from "../../../../store/slices/productSlice";

export default function ProdSpecification() {
  const dispatch = useAppDispatch();

  const specifications = useAppSelector((state) => state.product.specification);

  const handleChange = (parentField: any, field: string) => (event: any) => {
    const value = event.target.value;
    dispatch(updateProductSpecification({ parentField, field, value }));
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Specifications</p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full text-sm">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center justify-start p-1 px-0">
              <IconId size={20} />
              <span className="font-medium text-[#797474] text-[15px] px-3 capitalize">
                Specification
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Display</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.common.display || ""}
                  onChange={handleChange("common", "display")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Processor</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.common.processor || ""}
                  onChange={handleChange("common", "processor")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Battery</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.common.battery || ""}
                  onChange={handleChange("common", "battery")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">
                  Operating system
                </p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.common.operatingSystem || ""}
                  onChange={handleChange("common", "operatingSystem")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">
                  Water Resistance
                </p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.common.waterResistance || ""}
                  onChange={handleChange("common", "waterResistance")}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center justify-start p-1 px-0">
              <IconCamera size={20} />
              <span className="font-medium text-[#797474] text-[15px] px-3 capitalize">
                Camera
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">
                  Front Camera:
                </p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.camera.front || ""}
                  onChange={handleChange("camera", "front")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Rear Camera</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.camera.rear || ""}
                  onChange={handleChange("camera", "rear")}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center justify-start p-1 px-0">
              <IconAugmentedReality size={20} />
              <span className="font-medium text-[#797474] text-[15px] px-3 capitalize">
                Dimension
              </span>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Height</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.dimension.height || ""}
                  onChange={handleChange("dimension", "height")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Width</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.dimension.width || ""}
                  onChange={handleChange("dimension", "width")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Depth</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.dimension.depth || ""}
                  onChange={handleChange("dimension", "depth")}
                />
              </div>
              <div>
                <p className="my-0 mb-1 text-[#797474] text-sm">Weight</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  value={specifications.dimension.weight || ""}
                  onChange={handleChange("dimension", "weight")}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
