import {
  addVariant,
  removeVariant,
  setVariantType,
  setVariantValue,
  removeVariantValue,
} from "../../../../store/slices/variantSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import { TextField, Chip, Box, Button, Stack, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

interface Variant {
  id: number;
  type: string;
  values: string[];
}

const VariantOption: React.FC<Variant> = ({ id, type, values }) => {
  const useDispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
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
          remove_value: values[values.length - 1], // Correct way to access the last element
        })
      );
      setInputValue("");
    }
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
            className="flex-grow min-w-[50px] mt-1"
            placeholder={values.length === 0 ? "Enter values" : ""}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
        <div
          className="cursor-pointer text-red-400 flex items-center justify-center w-[120px]"
          onClick={() => useDispatch(removeVariant({ id }))}
        >
          <DeleteOutlineIcon />
        </div>
      </div>
      <Divider className="mt-3" />
    </Box>
  );
};

const PhoneVariants = () => {
  const useDispatch = useAppDispatch();
  const phone_variant = useAppSelector((state) => state.variants.phone_variant);

  return (
    <div className="w-full rounded-lg mb-2 p-5">
      <p className="font-medium text-lg">
        Phone Variants <span className="text-red-600"> *</span>
      </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 min-h-[300px] h-full flex flex-col gap-3">
        <div className="flex items-center w-full">
          <p className="w-1/4 my-1 font-medium px-2">Variant type</p>
          <p className="w-full my-1 font-medium px-4">Variant values</p>
          <Box className="flex items-center justify-end w-[150px]">
            <Button
              className="capitalize m-0 p-0"
              onClick={() => useDispatch(addVariant())}
            >
              + Add Variant
            </Button>
          </Box>
        </div>

        <Stack spacing={2}>
          {phone_variant.map((item, index) => (
            <VariantOption
              key={index}
              id={item.id}
              type={item.type}
              values={item.values}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};
export default PhoneVariants;
