import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const productCollections = [
  { title: "Furniture Collection" },
  { title: "Shoes Collection" },
  { title: "Autumn Collection" },
  { title: "Winter Collection" },
  { title: "Electronics" },
];

function ProdCollections() {
  const dispatch = useAppDispatch();
  const selectedCollections = useAppSelector(
    (state) => state.product.collections
  );

  const handleCollectionsChange = (event: any, newValue: any) => {
    const selectedTitles = newValue.map(
      (item: { title: string }) => item.title
    );
    dispatch(
      updateProductField({ field: "collections", value: selectedTitles })
    );
  };

  return (
    <Box className="mt-2">
      <span className="my-0 mb-1 text-[#797474] text-sm">
        Collections <span className="text-red-600"> *</span>
      </span>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={productCollections}
        size="small"
        className="w-full min-h-[40px] mb-1"
        disableCloseOnSelect
        value={productCollections.filter((option) =>
          selectedCollections.includes(option.title)
        )}
        onChange={handleCollectionsChange}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              "aria-label": "Without label",
            }}
          />
        )}
      />
    </Box>
  );
}

export default ProdCollections;
