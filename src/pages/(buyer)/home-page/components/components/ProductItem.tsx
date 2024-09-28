import React, { useState } from "react";
import { Box, Divider, Skeleton, Stack } from "@mui/material";
import {
  IconStarFilled,
  IconHeartFilled,
  IconHeart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "../../../../../types/product_types";
import { useAppSelector } from "../../../../../store/store";

interface ProductItemProps {
  item?: ProductProps;
  loading?: boolean;
}

const ProductItem = ({ item, loading }: ProductItemProps) => {
  const fallbackImageURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s";
  const navigate = useNavigate();
  const [like, setLike] = useState<boolean>(true);
  const user_role = useAppSelector((state) => state.user.role);

  return (
    <Box className="rounded-lg mx-auto my-auto shadow-xl w-full flex flex-col items-center pt-3">
      <div className="relative overflow-hidden rounded-lg w-full px-3">
        {loading ? (
          <Skeleton
            className="w-full aspect-square max-w-[250px] max-h-[270px]"
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <img
            src={item?.primaryImageURL || fallbackImageURL}
            alt={`Product: ${item?.name}`}
            className="w-full aspect-square object-cover cursor-pointer mt-2 max-h-[270px]"
            onClick={() =>
              navigate(
                user_role === "seller"
                  ? `/products/${item?.id}`
                  : `/${item?.id}`
              )
            }
          />
        )}
        <div
          onClick={() => setLike((prev) => !prev)}
          className="flex items-center justify-center p-1 bg-slate-100 absolute top-3 left-5 z-10 rounded-full bg-opacity-80 cursor-pointer border-[2px] border-solid border-gray-300"
        >
          {like ? <IconHeart size={20} /> : <IconHeartFilled size={20} />}
        </div>
      </div>
      <Divider className="my-3 w-full" />
      <Stack className="px-3 pb-2 w-full">
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-lg sm:text-xl my-1 font-bold h-6"
          />
        ) : (
          <p className="text-lg sm:text-xl my-1 font-bold truncate">
            {item?.name || "Product name here"}
          </p>
        )}
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-xs sm:text-sm text-gray-400 my-0 font-medium h-4"
          />
        ) : (
          <p className="text-xs sm:text-sm text-gray-400 my-0 font-medium">
            {item?.brandName || "Brand name"}
          </p>
        )}

        <div className="flex items-start sm:items-center justify-between w-full flex-col sm:flex-row mt-2">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-start gap-3 text-base sm:text-lg my-1 font-medium text-[gray]">
              {loading ? (
                <Skeleton
                  animation="wave"
                  className="text-gray-300 my-0 line-through w-[50px]"
                />
              ) : (
                <p className="text-gray-300 my-0 line-through truncate">
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
            <div className="flex items-center justify-start gap-2 mt-2">
              <div className="flex items-center justify-start gap-1">
                <IconStarFilled size={16} color="orange" />
                {loading ? (
                  <Skeleton
                    animation="wave"
                    className="text-black my-0 w-[30px]"
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
                <span className="text-xs sm:text-sm my-0 font-medium text-gray-600">
                  {item?.quantitySold || 30} Sold
                </span>
              )}
            </div>
          </div>
          <Box className="w-[35px] h-[35px] text-white bg-black pb-1 flex items-center justify-center rounded-full text-[20px] font-bold cursor-pointer mt-2 sm:mt-0">
            +
          </Box>
        </div>
      </Stack>
    </Box>
  );
};

export default ProductItem;
