import React, { useEffect, useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { ProductProps } from "../../Products/Products";
import { getProductList } from "../../../api/ProductApi";
import { toast } from "../../../utils/Toastify";

const ProductItem = (props: ProductProps) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <Box className="rouned-lg w-[300px] shadow-xl pb-10">
      <img
        src={props.primaryImageURL ? props.primaryImageURL : fallbackImageURL}
        alt={`Product: ${props.name}`}
        className="w-[250px] h-[250px] object-cover rounded-lg"
      />
      <Divider className="my-3" />
      <Stack className="px-3 pb-2">
        <p className="text-lg my-1 font-medium truncate">Name: {props.name}</p>
        <p className="text-lg text-blue-400 my-0 font-medium">
          Sale Price: ${props.salePrice.toFixed(2)} $
        </p>
        <p className="text-sm my-1 font-medium text-[gray]">
          Price: ${props.price.toFixed(2)} $
        </p>
        <p className="text-sm my-1">
          {props.categories.map(
            (item, index) =>
              `${item.name} ${
                index !== props.categories.length - 1 ? " & " : ""
              }`
          )}
        </p>
        <p className="text-sm my-1 font-medium text-[gray]">
          Sell on: {props.sellingTypes}
        </p>
      </Stack>
    </Box>
  );
};

const PopularProducts = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const response_data = await getProductList();
        console.log(response_data);
        setProductList(response_data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-[20px]">
      <h2 className="mx-[auto]"> Popular Products </h2>
      <div className="overflow-x-scroll flex items-start justify-start gap-8 mx-[auto]">
        {productList.length > 0 ? (
          productList.map((item) => <ProductItem key={item.id} {...item} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg"> No Product </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularProducts;
