import { IconArrowLeft, IconUpload } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  ImageList,
  ImageListItem,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface ImageFile {
  file: File;
  url: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [category1, setCategory1] = React.useState<string[]>([]);
  const [age, setAge] = React.useState<string>("Kg");
  const [businessDescription, setBusinessDescription] = useState("");
  const [imageList, setImageList] = useState<ImageFile[]>([]);

  const uploadImageList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageList: ImageFile[] = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setImageList((prevList) => [...prevList, ...newImageList]);

      console.log("New image list:", newImageList);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        setBusinessDescription(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChange = (event: SelectChangeEvent<typeof category1>) => {
    const {
      target: { value },
    } = event;
    setCategory1(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-3">
      <div className="mr-auto flex items-center justify-center gap-3 px-5">
        <Button
          className="rounded-lg h-[50px] border-[2px] border-solid border-gray-400"
          onClick={() => navigate("/products")}
        >
          <IconArrowLeft size={30} color="gray" />
        </Button>
        <div>
          <p className="text-[gray] font-medium my-1 text-sm">
            Back to product list
          </p>
          <p className="font-medium text-xl my-0">Add New Product</p>
        </div>
      </div>
      <div className="w-full flex items-start justify-center p-2 gap-3 h-full my-2 overflow-scroll">
        <div className="w-1/2 flex flex-col items-center justify-start">
          <div className="w-full flex flex-col rounded-lg mb-3 p-3">
            <p className="font-medium text-lg">Description</p>
            <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
              <div>
                <p className="my-0 text-[#cac4c4] text-sm">Product name</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  className="pb-4"
                />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 ">
                  <p className="my-0 text-[#cac4c4] text-sm">
                    Business Description
                  </p>
                  <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    className="capitalize"
                    startIcon={<IconUpload size={22} className="mb-[1px]" />}
                  >
                    Upload .txt files
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileUpload}
                      accept=".txt"
                      multiple
                    />
                  </Button>
                </div>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={8}
                  required
                  size="small"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg mb-3 p-3">
            <p className="font-medium text-lg">Category</p>
            <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
              <div>
                <p className="my-0 text-[#cac4c4] text-sm">Product Category</p>
                <FormControl className="w-full">
                  <InputLabel id="demo-multiple-chip-label">Level 1</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    value={category1}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    className="h-[40px] w-full"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <span className="text-sm font-medium text-[gray]">
                            {value}
                          </span>
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <p className="my-0 text-[#cac4c4] text-sm">Product Category</p>
                <FormControl className="w-full">
                  <InputLabel id="demo-multiple-chip-label">Level 2</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    value={category1}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    className="h-[42px] w-full"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <span className="text-sm font-medium text-[gray]">
                            {value}
                          </span>
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg mb-3 p-3">
            <p className="font-medium text-lg">Inventory</p>
            <div className="border-2  border-solid border-gray-200 rounded-lg p-5 h-full flex  gap-3">
              <div className="w-1/2">
                <p className="my-0 text-[#cac4c4] text-sm">Quantity</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  className="pb-4"
                  type="number"
                />
              </div>
              <div className="w-1/2">
                <p className="my-0 text-[#cac4c4] text-sm">SKU (optional)</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                  className="pb-4"
                />
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg mb-3 p-3">
            <p className="font-medium text-lg"> Selling Type </p>
            <div className="border-2  border-solid border-gray-200 rounded-lg p-5 h-full flex gap-3">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="In-store selling only"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Online selling only"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Available both online and in-store"
                />
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-full rounded-lg mb-3 p-3">
            <p className="font-medium text-lg"> Product images</p>
            <div className="border-2  border-solid border-gray-200 rounded-lg p-5 h-full flex gap-3">
              <Box className="w-full h-[325px] flex items-center justify-start gap-5">
                <Box
                  component="label"
                  className="h-full cursor-pointer w-1/3 flex flex-col items-center justify-center rounded-lg bg-slate-100"
                >
                  <p className="font-medium my-1 text-[blue]">Upload images</p>
                  <p className="my-1">(.png, .jped, .jpg)</p>
                  <VisuallyHiddenInput
                    type="file"
                    onChange={uploadImageList}
                    accept="image/*"
                    multiple
                  />
                </Box>
                <Box className="h-[325px] w-2/3 flex items-center justify-start gap-5">
                  <ImageList
                    cols={3}
                    gap={8}
                    className="w-full h-full rounded-lg"
                    variant="quilted"
                  >
                    {imageList.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          srcSet={`${item.url}`}
                          src={`${item.url}`}
                          alt={item.file.name}
                          loading="lazy"
                          className="w-[400] h-[400] object-cover"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              </Box>
            </div>
          </div>
          <div className="w-full rounded-lg mb-3 p-3">
            <p className="font-medium text-lg"> Selling Type</p>
            <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
              <div>
                <p className="my-0 text-[#cac4c4] text-sm">Item weight</p>
                <div className="w-full flex items-center justify-between px-5 border-2 h-[42px] border-solid border-gray-400 rounded-md">
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="00.00"
                    type="number"
                    className="h-[42px]"
                  />
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    size="small"
                    className="outline-none"
                    onChange={handleChange2}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        height: "42px",
                      },
                    }}
                  >
                    <MenuItem value={"Kg"}>Kg</MenuItem>
                    <MenuItem value={"Pound"}>Pb</MenuItem>
                  </Select>
                </div>
              </div>
              <div>
                <p className="font-medium"> Package Size</p>
                <div className="flex item-start justify-between gap-5">
                  <div className="flex items-start justify-center flex-col w-1/3">
                    <p className="my-0 text-[#cac4c4] text-sm">Length</p>
                    <TextField
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">In</InputAdornment>
                          ),
                        },
                      }}
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="00.00"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="flex items-start justify-center flex-col w-1/3">
                    <p className="my-0 text-[#cac4c4] text-sm">Breath</p>
                    <TextField
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">In</InputAdornment>
                          ),
                        },
                      }}
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="00.00"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="flex items-start justify-center flex-col w-1/3">
                    <p className="my-0 text-[#cac4c4] text-sm">Width</p>
                    <TextField
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">In</InputAdornment>
                          ),
                        },
                      }}
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="00.00"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-lg mb-3 p-3">
            <p className="font-medium text-lg"> Pricing </p>
            <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
              <div className="w-full  flex items-center justify-between gap-5">
                <div className="w-full">
                  <p className="my-0 text-[#cac4c4] text-sm">MSRP Price</p>
                  <TextField
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box className="w-[40px] h-[40px] bg-[#eef3ff] rounded-md flex items-center text-black text-xl justify-center">
                              $
                            </Box>
                          </InputAdornment>
                        ),
                      },
                    }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    type="number"
                    placeholder="00.00"
                    className="w-full rounded-md"
                  />
                </div>
                <div className="w-full">
                  <p className="my-0 text-[#cac4c4] text-sm">Sale Price</p>
                  <TextField
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box className="w-[40px] h-[40px] bg-[#eef3ff] rounded-md flex items-center text-black text-xl justify-center">
                              $
                            </Box>
                          </InputAdornment>
                        ),
                      },
                    }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    type="number"
                    placeholder="00.00"
                    className="w-full rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="my-0 text-[#cac4c4] text-sm">Price</p>
                <TextField
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box className="w-[40px] h-[40px] bg-[#eef3ff] rounded-md flex items-center text-black text-xl justify-center">
                            $
                          </Box>
                        </InputAdornment>
                      ),
                    },
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="00.00"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="w-full items-center justify-between flex px-4 mt-5">
            <Button
              size="large"
              className="rounded-md capitalize"
              variant="outlined"
            >
              Discard
            </Button>
            <div className="flex items-center justify-center gap-5">
              <Button
                size="large"
                variant="outlined"
                className="rounded-md capitalize"
              >
                Clone
              </Button>
              <Button
                size="large"
                className="rounded-md capitalize"
                variant="contained"
              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];
