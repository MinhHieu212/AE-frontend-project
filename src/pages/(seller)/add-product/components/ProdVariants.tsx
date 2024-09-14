import {
  addVariant,
  removeVariant,
  setVariantType,
  setVariantValue,
  removeVariantValue,
  initializeCombinations,
  setIsTableGenerated,
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

interface Variant {
  id: number;
  type: string;
  values: string[];
}

const VariantOption: React.FC<Variant> = ({ id, type, values }) => {
  const useDispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const isTableGenerated = useAppSelector(
    (state) => state.variants.isTableGenerated
  );

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
          disabled={isTableGenerated}
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
            disabled={isTableGenerated}
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
          onClick={() => {
            if (!isTableGenerated) useDispatch(removeVariant({ id }));
          }}
        >
          <DeleteOutlineIcon />
        </div>
      </div>
      <Divider className="mt-3" />
    </Box>
  );
};

const ProdVariants = () => {
  const useDispatch = useAppDispatch();
  const phone_variant = useAppSelector((state) => state.variants.phone_variant);
  const isTableGenerated = useAppSelector(
    (state) => state.variants.isTableGenerated
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerateTable = () => {
    if (isTableGenerated) handleClickOpen();
    useDispatch(initializeCombinations(phone_variant));
    useDispatch(setIsTableGenerated({ value: true }));
  };

  const handleChangeVariant = () => {
    useDispatch(setIsTableGenerated({ value: false }));
    setOpen(false);
  };

  return (
    <div className="w-full rounded-lg mb-2 px-5">
      <p className="font-medium text-lg">
        Product Variants <span className="text-red-600"> *</span>
      </p>
      <div
        className={`border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3`}
      >
        <div className="flex items-center w-full">
          <p className="w-1/4 my-1 font-medium px-2">Variant type</p>
          <p className="w-full my-1 font-medium px-4">Variant values</p>
          <Box className="flex items-center justify-end w-[150px]">
            <Button
              className="capitalize m-0 p-0"
              onClick={() => {
                if (!isTableGenerated) useDispatch(addVariant());
              }}
            >
              + Add Variant
            </Button>
          </Box>
        </div>

        <Stack
          spacing={2}
          className={`${isTableGenerated ? "opacity-50" : ""}`}
        >
          {phone_variant.map((item, index) => (
            <VariantOption
              key={index}
              id={item.id}
              type={item.type}
              values={item.values}
            />
          ))}
        </Stack>
        <div className="flex items-center justify-end w-full">
          <Box className="flex items-center justify-end w-[150px]">
            <Button
              className={`capitalize ${
                isTableGenerated ? "border-red-400 text-[red]" : ""
              }`}
              variant="outlined"
              onClick={handleGenerateTable}
            >
              {isTableGenerated ? "Change Variants" : "Generate Table"}
            </Button>
          </Box>
        </div>
      </div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Changes"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="max-w-[400px]"
            >
              Are you sure you want to proceed? All existing variant data will
              be cleared.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleChangeVariant} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};
export default ProdVariants;
