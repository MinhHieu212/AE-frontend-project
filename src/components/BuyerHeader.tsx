import {
  Link,
  Paper,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Box,
  Badge,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  IconHeart,
  IconMail,
  IconSearch,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { setRole } from "../store/slices/roleSlice";
import { useAppDispatch } from "../store/store";

const BuyerHeader = () => {
  const useDispatch = useAppDispatch();
  const [category, setCategory] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="w-full h-[55px] flex items-center justify-between px-10 shadow-md mb-5">
      <div
        className="flex items-center gap-1 my-2 cursor-pointer w-[200px]"
        onClick={() => navigate("/homepage")}
      >
        <img
          src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
          alt="Company avatar"
          className="w-[55px] h-[55px] object-cover rounded-md"
        />
        <h2 className="text-[black] text-[20px]">Nasastore</h2>
      </div>

      <Paper
        component="form"
        className="flex items-center border-[0.2px] border-solid border-gray-300 justify-between w-[600px] rounded-lg overflow-hidden h-[40px] my-auto shadow-none"
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <IconSearch color="gray" size={20} />
        </IconButton>
        <InputBase
          size="small"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <FormControl
          sx={{
            minWidth: 120,
            height: "100%",
            borderLeft: "1px solid lightgray",
          }}
        >
          <Select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            variant="standard"
            size="small"
            disableUnderline
            inputProps={{ "aria-label": "Without label" }}
            className="h-full px-4 py-2 bg-white text-gray-400 outline-none focus:outline-none appearance-none rounded-none pt-[10px]"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Electronic</MenuItem>
            <MenuItem value={20}>Book</MenuItem>
            <MenuItem value={30}>Jewelry</MenuItem>
            <MenuItem value={30}>Sport</MenuItem>
          </Select>
        </FormControl>
        <Box
          className="w-[60px] bg-black p-4 flex items-center justify-center cursor-pointer"
          aria-label="search"
        >
          <IconSearch color="white" size={20} />
        </Box>
      </Paper>

      <div className="flex items-center justify-between gap-8">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            useDispatch(setRole({ user_role: "seller" }));
            navigate("/products");
          }}
        >
          Seller View
        </Button>

        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <IconUser size={22} />
          <div className="flex flex-col items-start justify-start gap-0">
            <span
              className="text-gray-400 text-xs"
              style={{ fontSize: "10px" }}
            >
              Sign in
            </span>
            <span className="font-semibold text-sm">Account</span>
          </div>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <Badge badgeContent={4} color="primary">
            <IconMail size={22} />
          </Badge>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <Badge badgeContent={2} color="primary">
            <IconHeart size={22} />
          </Badge>
        </div>
        <div className="flex items-center justify-centern gap-3 cursor-pointer">
          <IconShoppingCart size={22} />
          <div className="flex flex-col items-start justify-start">
            <span className="text-gray-400 text-xs">Total</span>
            <span className="font-semibold text-sm">$ 400.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHeader;
