import React, { useState } from "react";
import { Box, Divider, Skeleton, Stack } from "@mui/material";
import {
  IconStarFilled,
  IconHeartFilled,
  IconHeart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "../../../../../types/product_types";

interface ProductItemProps {
  item?: ProductProps;
  loading?: boolean;
}

const ProductItem = ({ item, loading }: ProductItemProps) => {
  const fallbackImageURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s";
  const navigate = useNavigate();
  const [like, setLike] = useState<boolean>(true);

  return (
    <Box className="rouned-lg mx-auto my-auto shadow-xl w-full flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg">
        {loading ? (
          <Skeleton
            className="w-[250px] h-[250px]"
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <img
            src={
              item?.primaryImageURL ? item?.primaryImageURL : fallbackImageURL
            }
            alt={`Product: ${item?.name}`}
            className="w-[250px] h-[250px] object-cover cursor-pointer mt-2"
            onClick={() => navigate(`/${item?.id}`)}
          />
        )}
        <div
          onClick={() => setLike((prev) => !prev)}
          className="flex items-center justify-center p-1 bg-slate-100 absolute top-3 left-3 z-100 rounded-full bg-opacity-80 cursor-pointer border-[2px] border-solid border-gray-300"
        >
          {like ? <IconHeart size={20} /> : <IconHeartFilled size={20} />}
        </div>
      </div>
      <Divider className="my-3" />
      <Stack className="px-3 pb-2 w-full">
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-[23px] my-1 font-bold truncate"
          />
        ) : (
          <p className="text-[18px] my-1 font-bold truncate">
            {item?.name || "Product name here"}
          </p>
        )}
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-sm text-gray-400 my-0 font-medium"
          />
        ) : (
          <p className="text-sm text-gray-400 my-0 font-medium">
            {item?.brandName || "Branch name"}
          </p>
        )}

        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center justify-center gap-3 text-lg mt-2 my-1 font-medium text-[gray] mr-auto">
              {loading ? (
                <Skeleton
                  animation="wave"
                  className="text-gray-300 my-0 line-through w-[50px]"
                />
              ) : (
                <p className="text-gray-300  my-0 line-through truncate">
                  $ {item?.price?.toFixed(2) || 0}
                </p>
              )}
              <Divider
                orientation="vertical"
                variant="middle"
                className="my-1"
                flexItem
              />
              {loading ? (
                <Skeleton
                  animation="wave"
                  className="text-black my-0 w-[50px]"
                />
              ) : (
                <p className="text-black my-0 truncate">
                  $ {item?.salePrice?.toFixed(2) || 0}
                </p>
              )}
            </div>
            <div className="flex item-center   gap-2 mt-2">
              <div className="flex items-center justify-start gap-2">
                <IconStarFilled size={18} color="orange" />
                {loading ? (
                  <Skeleton
                    animation="wave"
                    className="text-black my-0 w-[50px]"
                  />
                ) : (
                  <span className="text-xs">{item?.rating || "3.0"}</span>
                )}
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                className="my-1"
              />
              {loading ? (
                <Skeleton
                  animation="wave"
                  className="text-black my-0 w-[50px]"
                />
              ) : (
                <span className="text-sm my-0 font-medium text-gray-600">
                  {item?.quantitySold || 30} Sold
                </span>
              )}
            </div>
          </div>
          <Box className="w-[35px] h-[35px] text-white bg-black pb-1 flex items-center justify-center rounded-full text-[20px] font-bold cursor-pointer">
            +
          </Box>
        </div>
      </Stack>
    </Box>
  );
};

export default ProductItem;
