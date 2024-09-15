import {
  addVariant,
  removeVariant,
  setVariantType,
  setVariantValue,
  removeVariantValue,
} from "../../../../store/slices/variantSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField, Chip, Box, Button, Stack, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import React, { useEffect, useState } from "react";
import { PlusOne, X } from "@mui/icons-material";
interface FileImageProps {
  file: File;
  url: string;
}
interface VariantImagesListProps {
  type: string;
  value: string;
  images: FileImageProps[];
}
interface Variant {
  id: number;
  type: string;
  values: string[];
}

const VariantOption: React.FC<Variant> = ({ id, type, values }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [variantImagesList, setVariantImagesList] = useState<
    VariantImagesListProps[]
  >([]);

  useEffect(() => {
    setVariantImagesList(
      values.map((item) => ({
        type,
        value: item,
        images: [],
      }))
    );
  }, [values]);

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
      dispatch(setVariantValue({ id, new_value: inputValue.trim() }));
      setInputValue("");
    }

    if (
      event.key === "Backspace" &&
      inputValue.trim() === "" &&
      values.length > 0
    ) {
      dispatch(
        removeVariantValue({ id, remove_value: values[values.length - 1] })
      );
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (values.includes(inputValue.trim()) || inputValue.trim() === "") return;
    dispatch(setVariantValue({ id, new_value: inputValue.trim() }));
    setInputValue("");
  };

  const handleFileChange =
    (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newImages = Array.from(event.target.files).map((file) => ({
          url: URL.createObjectURL(file),
          file: file,
        }));

        setVariantImagesList((prev) =>
          prev.map((item) =>
            item.value === value
              ? { ...item, images: [...item.images, ...newImages] }
              : item
          )
        );
      }
    };

  const handleRemoveImage = (value: string, imageUrl: string) => {
    setVariantImagesList((prev) =>
      prev.map((item) =>
        item.value === value
          ? {
              ...item,
              images: item.images.filter((img) => img.url !== imageUrl),
            }
          : item
      )
    );
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
            dispatch(
              setVariantType({ id: id, new_type: e.target.value.toLowerCase() })
            )
          }
        />
        <Divider
          className={`w-[30px] ${
            values.length > 0 ? "bg-gray-300" : "bg-white"
          }`}
        />
        <Box className="w-full flex items-center justify-start flex-wrap gap-3 px-4 border-2 border-solid border-[#c8c3c3] p-[2px] rounded-[4px]">
          {values.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              className="px-1"
              onDelete={() =>
                dispatch(removeVariantValue({ id, remove_value: chip }))
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
          className={`w-[30px] ${
            values.length > 0 ? "bg-gray-300" : "bg-white"
          }`}
        />
        <Button
          startIcon={show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          onClick={() => setShow((prev) => !prev)}
          className="w-1/5 capitalize"
          color="primary"
        >
          Upload Images
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          className={`cursor-pointer text-red-400 flex items-center justify-center w-[120px]`}
          onClick={() => {
            dispatch(removeVariant({ id }));
          }}
        >
          <DeleteOutlineIcon />
        </Box>
      </div>

      <div
        className={`space-y-3 p-3 px-5 pb-10 image-section ${
          show ? "show" : ""
        } transition ease-in-out delay-500 ${show ? "" : "hidden"}`}
      >
        {variantImagesList.map((item) => (
          <div key={item.value} className="space-y-2">
            <p className="font-medium">
              <span className="font-bold uppercase"> {item.type} </span>:{" "}
              {item.value}
            </p>
            <div className="grid grid-cols-5 gap-4">
              {item.images?.map((subItem, index) => (
                <div key={index} className="relative group">
                  <img
                    src={subItem.url}
                    alt={`Preview ${subItem.file.name}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Box
                    onClick={() => handleRemoveImage(item.value, subItem.url)}
                    className="absolute top-1 right-1 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Box>
                </div>
              ))}
              <label
                htmlFor={`file-${item.value}`}
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="file"
                  id={`file-${item.value}`}
                  accept="image/*"
                  multiple
                  onChange={handleFileChange(item.value)}
                  className="hidden"
                />
                <PlusOne className="h-8 w-8 text-gray-400" />
              </label>
            </div>
          </div>
        ))}
      </div>

      <Divider className="mt-3" />
    </Box>
  );
};

const ProdVariants = () => {
  const useDispatch = useAppDispatch();
  const variants = useAppSelector((state) => state.variants.variants);

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
          {variants.map((item, index) => (
            <VariantOption
              key={index}
              id={item.id}
              type={item.type}
              values={item.values}
            />
          ))}
        </Stack>

        <div className="flex items-center justify-between w-full">
          <Box className="flex items-center justify-end">
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
