import React, { useEffect, useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { IconStarFilled } from "@tabler/icons-react";
import { ProductProps } from "../../../Products/Products";

const ProductItem = (props: ProductProps) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <Box className="rouned-lg w-[300px] shadow-xl">
      <img
        src={props.primaryImageURL ? props.primaryImageURL : fallbackImageURL}
        alt={`Product: ${props.name}`}
        className="w-[300px] h-[300px] object-cover rounded-lg cursor-pointer"
        onClick={() => console.log(JSON.stringify(props, null, 2))}
      />
      <Divider className="my-3" />
      <Stack className="px-3 pb-2">
        <p className="text-[23px] my-1 font-bold truncate">
          {props.name || "Product name here"}
        </p>

        <p className="text-sm text-gray-400 my-0 font-medium">
          {props.brandName || "Branch name"}
        </p>
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex item-center justify-between mr-[auto] gap-2 mt-2">
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
            <div className="flex items-center justify-center gap-3 text-sm my-1 font-medium text-[gray] mr-auto">
              <p className="text-gray-300 my-0">$ {props.price.toFixed(2)}</p>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                className="my-3"
              />
              <p className="text-black my-0">$ {props.salePrice.toFixed(2)}</p>
            </div>
          </div>

          <Box className="w-[40px] h-[40px] text-white bg-black flex items-center justify-center rounded-full text-[20px] font-bold">
            +
          </Box>
        </div>
      </Stack>
    </Box>
  );
};

export default ProductItem;
