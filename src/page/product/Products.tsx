import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { product_response } from "./product_response";

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

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <div className="w-4/5 bg-slate-100 mx-auto mb-2 p-3 rounded-xl flex items-center justify-start gap-3 border-2 border-solid border-gray-200">
      <div className="w-[150px] h-[130px] rounded-lg overflow-hidden">
        <img
          src={
            props.imageURL && props.imageURL.length > 0
              ? props.imageURL[0]
              : fallbackImageURL
          }
          alt={`Product: ${props.name}`}
          className="h-full w-full object-fill"
        />
      </div>
      <div className="flex h-full items-start w-full justify-start flex-col p-2">
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
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <div className="flex h-12 items-center justify-between px-5 mt-5">
        <h2 className="text-xl font-bold">Products</h2>
        <Button
          variant="contained"
          onClick={() => navigate("/products/add-product")}
          className="capitalize"
        >
          Add new Product
        </Button>
      </div>
      <Stack
        spacing={2}
        className="h-[calc(100dvh-140px)] overflow-scroll my-2 px-5 mt-10"
      >
        {product_response.status === 200 ? (
          product_response.data.map((item) => (
            <ProductItem key={item.id} {...item} />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg"> No Product </p>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Products;
