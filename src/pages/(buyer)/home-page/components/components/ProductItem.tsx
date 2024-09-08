import React, { useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import {
  IconStarFilled,
  IconHeartFilled,
  IconHeart,
} from "@tabler/icons-react";
import { ProductProps } from "../../../../(seller)/product-list/ProductList";
import { useNavigate } from "react-router-dom";

const ProductItem = (props: ProductProps) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
  const navigate = useNavigate();
  const [like, setLike] = useState<boolean>(true);

  return (
    <Box className="rouned-lg mx-auto my-auto shadow-xl w-full flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={props.primaryImageURL ? props.primaryImageURL : fallbackImageURL}
          alt={`Product: ${props.name}`}
          className="w-[300px] h-[300px]  object-cover cursor-pointer mt-2"
          onClick={() => navigate(`/${props.name.split(" ").join("_")}`)}
        />
        <div
          onClick={() => setLike((prev) => !prev)}
          className="flex items-center justify-center p-2 bg-slate-100 absolute top-5 left-5 z-100 rounded-full bg-opacity-80 cursor-pointer"
        >
          {like ? <IconHeart /> : <IconHeartFilled />}
        </div>
      </div>
      <Divider className="my-3" />
      <Stack className="px-3 pb-2 w-full">
        <p className="text-[23px] my-1 font-bold truncate">
          {props.name || "Product name here"}
        </p>
        <p className="text-sm text-gray-400 my-0 font-medium">
          {props.brandName || "Branch name"}
        </p>
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center justify-center gap-3 text-xl mt-2 my-1 font-medium text-[gray] mr-auto">
              <p className="text-gray-300 my-0 line-through">
                $ {props.price.toFixed(2)}
              </p>
              <Divider
                orientation="vertical"
                variant="middle"
                className="my-1"
                flexItem
              />
              <p className="text-black my-0">$ {props.salePrice.toFixed(2)}</p>
            </div>
            <div className="flex item-center   gap-2 mt-2">
              <div className="flex items-center justify-start gap-2">
                <IconStarFilled size={18} color="orange" />
                <span className="text-xs">{props.rating || "3.0"}</span>
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                className="my-1"
              />
              <span className="text-sm my-0 font-medium text-gray-600">
                {props.quantitySold || 30} Sold
              </span>
            </div>
          </div>
          <Box className="w-[40px] h-[40px] text-white bg-black flex items-center justify-center rounded-full text-[20px] font-bold cursor-pointer">
            +
          </Box>
        </div>
      </Stack>
    </Box>
  );
};

export default ProductItem;
