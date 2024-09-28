import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Box,
  Badge,
  useMediaQuery,
  Menu,
} from "@mui/material";
import {
  IconHeart,
  IconMail,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconMenu2,
} from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateUserField } from "../store/slices/userSlice";

const BuyerHeader = () => {
  const [category, setCategory] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user_role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:800px)");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignInOut = () => {
    if (user_role === "buyer") {
      dispatch(updateUserField({ role: "anonymous" }));
    }
    navigate("/sign-in");
    handleMenuClose();
  };

  return (
    <div className="w-full h-[55px] flex items-center justify-between px-4 md:px-10 shadow-md mb-5">
      <div
        className="flex items-center gap-1 my-2 cursor-pointer w-[200px]"
        onClick={() => navigate("/homepage")}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/accessed_logo.png`}
          alt="Company avatar"
          className="w-[45px] h-[45px] object-cover rounded-md"
        />
        <h2 className="text-[green] text-[20px]">Accessed</h2>
      </div>
      {isMobile ? (
        <Box className="flex flex-grow justify-end">
          <IconButton
            onClick={() => {
              /* Open search modal */
            }}
          >
            <IconSearch />
          </IconButton>
        </Box>
      ) : (
        <Paper
          component="form"
          className="flex items-center border-[0.2px] border-solid border-gray-300 justify-between w-[600px]  rounded-lg overflow-hidden h-[40px] my-auto shadow-none"
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
      )}

      {isMobile ? (
        <div>
          <IconButton onClick={handleMenuOpen}>
            <IconMenu2 />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleSignInOut}>
              {user_role === "buyer" ? "Logout" : "Sign in"}
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Messages</MenuItem>
            <MenuItem onClick={handleMenuClose}>Favorites</MenuItem>
            <MenuItem onClick={handleMenuClose}>Cart</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center justify-center gap-3 cursor-pointer">
            <IconUser size={22} />
            <div
              className="flex flex-col items-start justify-start gap-0"
              onClick={handleSignInOut}
            >
              <span
                className="text-gray-400 text-xs"
                style={{ fontSize: "10px" }}
              >
                {user_role === "buyer" ? "Logout" : "Sign in"}
              </span>
              <span className="font-semibold text-sm">
                {user_role === "buyer" ? "Hieu Minh" : "Account"}
              </span>
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
      )}
    </div>
  );
};

export default BuyerHeader;
