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

  const handleViewSellerRole = () => {
    useDispatch(setRole({ user_role: "seller" }));
    navigate("/products");
    localStorage.setItem("user_role", "seller");
  };

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-10 shadow-md mb-5">
      <div
        className="flex items-center gap-3 my-2 cursor-pointer w-[200px]"
        onClick={() => navigate("/homepage")}
      >
        <img
          src="https://cdn.worldvectorlogo.com/logos/nasa-2.svg"
          alt="Company avatar"
          className="w-[60px] h-[60px] object-cover rounded-md"
        />
        <h2 className="text-[black]">Nasa Store</h2>
      </div>

      <Paper
        component="form"
        className="flex items-center border-[0.2px] border-solid border-gray-300 justify-between w-[600px] rounded-lg overflow-hidden h-[45px] my-auto shadow-none"
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
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
            disableUnderline
            inputProps={{ "aria-label": "Without label" }}
            className="h-full px-4 py-2 bg-white text-gray-400 outline-none focus:outline-none appearance-none rounded-none"
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
          <IconSearch color="white" />
        </Box>
      </Paper>

      <div className="flex items-center justify-between gap-5">
        <div
          className="flex items-center justify-center gap-3 cursor-pointer"
          onClick={handleViewSellerRole}
        >
          <IconUser size={25} />
          <div className="flex flex-col items-start justify-start">
            <span className="text-gray-400 text-[8px]">Sign in</span>
            <span className="font-semibold text-sm">Account</span>
          </div>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <Badge badgeContent={4} color="primary">
            <IconMail size={25} />
          </Badge>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <Badge badgeContent={4} color="primary">
            <IconHeart size={25} />
          </Badge>
        </div>
        <div className="flex items-center justify-centern gap-3 cursor-pointer">
          <IconShoppingCart size={25} />
          <div className="flex flex-col items-start justify-start">
            <span className="text-gray-400 text-[8px]">Total</span>
            <span className="font-semibold text-sm">$ 400.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHeader;
