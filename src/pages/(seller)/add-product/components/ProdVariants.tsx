import {
  addVariant,
  removeVariant,
  setVariantType,
  setVariantValue,
  removeVariantValue,
} from "../../../../store/slices/variantSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import {
  TextField,
  Chip,
  Box,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

import PopupVariantImages from "./PopupVariantImages";

interface Variant {
  id: number;
  type: string;
  values: string[];
}

const VariantOption: React.FC<Variant> = ({ id, type, values }) => {
  const useDispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault();
      if (values.includes(inputValue.trim())) return;
      useDispatch(
        setVariantValue({
          id,
          new_value: inputValue.trim(),
        })
      );
      setInputValue("");
    }

    if (
      event.key === "Backspace" &&
      inputValue.trim() === "" &&
      values.length > 0
    ) {
      useDispatch(
        removeVariantValue({
          id,
          remove_value: values[values.length - 1],
        })
      );
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (values.includes(inputValue.trim()) || inputValue.trim() === "") return;
    useDispatch(
      setVariantValue({
        id,
        new_value: inputValue.trim(),
      })
    );
    setInputValue("");
  };

  return (
    <Box>
      <div className="flex items-center">
        <TextField
          className="w-1/4"
          size="small"
          placeholder="Enter type"
          value={type}
          onChange={(e) =>
            useDispatch(
              setVariantType({ id: id, new_type: e.target.value.toLowerCase() })
            )
          }
        />
        <Divider
          className={`w-[30px] ${values.length > 0 ? "bg-black" : ""}`}
        />
        <Box className="w-full flex items-center justify-start flex-wrap gap-3 px-4 border-2 border-solid border-[#c8c3c3] p-[2px] rounded-[4px]">
          {values.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              className="px-1"
              onDelete={() =>
                useDispatch(removeVariantValue({ id, remove_value: chip }))
              }
            />
          ))}
          <TextField
            size="small"
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={handleInputBlur}
            className={`flex-grow min-w-[50px] mt-1`}
            placeholder={values.length === 0 ? "Enter values" : ""}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
        <Divider
          className={`w-[30px] ${values.length > 0 ? "bg-black" : ""}`}
        />
        <PopupVariantImages
          open={open}
          setOpen={setOpen}
          id={id}
          type={type}
          values={values}
        />
        <Box
          className={`cursor-pointer text-red-400 flex items-center justify-center w-[120px]`}
          onClick={() => {
            useDispatch(removeVariant({ id }));
          }}
        >
          <DeleteOutlineIcon />
        </Box>
      </div>
      <Divider className="mt-3" />
    </Box>
  );
};

const ProdVariants = () => {
  const useDispatch = useAppDispatch();
  const product_variant = useAppSelector(
    (state) => state.variants.product_variant
  );

  return (
    <div className="w-full rounded-lg mb-2 px-5">
      <p className="font-medium text-lg">
        Product Variants <span className="text-red-600"> *</span>
      </p>
      <div
        className={`border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3`}
      >
        <div className="flex items-center w-full">
          <p className="w-1/4 my-1 font-medium">Variant type</p>
          <p className="w-full my-1 font-medium pl-[20px]">Variant values</p>
          <p className="w-1/5 my-1 font-medium px-2 mr-[70px]">
            Variant Images
          </p>
        </div>

        <Stack spacing={2}>
          {product_variant.map((item, index) => (
            <VariantOption
              key={index}
              id={item.id}
              type={item.type}
              values={item.values}
            />
          ))}
        </Stack>
        <div className="flex items-center justify-between w-full">
          <Box className="flex items-center justify-end ml-[45px]">
            <Button
              className="capitalize m-0 p-0 font-medium"
              onClick={() => {
                useDispatch(addVariant());
              }}
            >
              + Add Another Variant
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default ProdVariants;
