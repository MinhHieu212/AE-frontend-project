import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";
import { getCollections } from "../../../../api/CollectionApi";
import { toast } from "../../../../utils/Toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ProdCollections() {
  const dispatch = useAppDispatch();
  const [productCollections, setProductCollections] = useState([]);
  const selectedCollections = useAppSelector(
    (state) => state.product.collections
  );

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response_data = await getCollections();
        console.log("Collections", response_data);
        setProductCollections(
          response_data.map((item: any) => ({ name: item.name, id: item.id }))
        );
      } catch (error: any) {
        toast.error(error?.message);
      }
    };
    fetchCollections();
  }, []);

  const handleCollectionsChange = (event: any, newValue: any) => {
    dispatch(updateProductField({ field: "collections", value: newValue }));
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
        value={selectedCollections}
        onChange={handleCollectionsChange}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
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
