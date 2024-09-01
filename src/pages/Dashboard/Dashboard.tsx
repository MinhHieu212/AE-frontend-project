import React from "react";
import { Link } from "react-router-dom";
import { fake_data_products } from "../Products/fake_data_products";
import BannerCarousel from "../../components/BannerCarousel";
import { Box, Divider, Stack } from "@mui/material";

interface CategoryProps {
  id: number;
  name: string;
  parentID: number | null;
  noOfViews: number;
  productsSold: number;
}

interface ProductItemProps {
  id: number;
  name: string;
  oldPrice: number;
  price: number;
  rating: number;
  brandName: string | null;
  viewCount: number;
  imageURL: string[] | null;
  description: string;
  quantitySold: number;
  remainingQuantity: number;
  categories: CategoryProps[];
}

const ProductItem = (props: ProductItemProps) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <Box className="rouned-lg w-[300px] shadow-xl">
      <img
        src={
          props.imageURL && props.imageURL.length > 0
            ? props.imageURL[0]
            : fallbackImageURL
        }
        alt={`Product: ${props.name}`}
        className="w-[250px] h-[250px] object-cover rounded-lg"
      />
      <Divider className="my-3" />
      <Stack className="px-3 pb-2">
        <p className="text-lg my-1 font-medium">Name: {props.name}</p>
        <p className="text-sm my-1">
          {props.categories.map(
            (item, index) =>
              `${item.name} ${
                index !== props.categories.length - 1 ? " & " : ""
              }`
          )}
        </p>
        <p className="text-sm my-1 font-medium text-[gray]">
          Price: ${props.price.toFixed(2)} $
        </p>
        <p className="text-sm my-1 font-medium text-[gray]">
          Onhand: {props.remainingQuantity} unit
        </p>
      </Stack>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1430px] mx-auto mih-full bg-white pb-[220px]">
      <BannerCarousel />
      <div className="w-full my-[20px]">
        <h2 className="mx-[auto]"> Popular Products </h2>
        <div className="overflow-x-scroll flex items-center justify-start gap-8 mx-[auto]">
          {fake_data_products.status === 200 ? (
            fake_data_products.data.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold text-lg"> No Product </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
