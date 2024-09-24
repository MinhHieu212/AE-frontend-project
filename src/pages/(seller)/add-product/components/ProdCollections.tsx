import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@mui/material";

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
  return (
    <Box className="mt-2">
      <span className="my-0 mb-1 text-[#aca4a4] text-sm">
        Collections <span className="text-red-600"> *</span>
      </span>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={productCollections}
        size="small"
        className="w-full min-h-[40px] mb-1"
        disableCloseOnSelect
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
