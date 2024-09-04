import React, { useEffect, useState } from "react";
import { Button, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../api/ProductApi";
import { toast } from "../../utils/Toastify";

interface CategoryProps {
  id: number;
  name: string;
  parentID: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  subCategory: CategoryProps[];
  noOfViews: number;
  productsSold: number;
}
interface Dimensions {
  weight?: number; // Assuming weight might be optional
  length?: number; // Assuming dimensions might be optional
  width?: number; // Assuming dimensions might be optional
  height?: number; // Assuming dimensions might be optional
}
export interface ProductProps {
  id: number;
  name: string;
  imageURL: string[];
  primaryImageURL: string;
  description: string;
  msrp: number;
  salePrice: number;
  price: number;
  rating: number;
  viewCount: number;
  quantity: number;
  quantitySold: number;
  remainingQuantity: number;
  brandName: string | null;
  sellingTypes: string;
  createdAt: string;
  updatedAt: string | null;
  categories: CategoryProps[];
  dimensions: Dimensions | null;
  sku: string;
}

const ProductItem: React.FC<ProductProps> = ({ ...props }) => {
  const fallbackImageURL =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <div className="w-full mx-auto mb-2 p-3 rounded-xl flex items-center justify-start gap-3 border-2 border-solid border-gray-200 bg-[#f9fcff] ">
      <div className="w-[180px] h-[150px] rounded-lg overflow-hidden">
        <img
          src={props.primaryImageURL ? props.primaryImageURL : fallbackImageURL}
          alt={`Product: ${props.name}`}
          className="h-full w-full object-cover cursor-pointer"
          onClick={() => console.log(JSON.stringify(props, null, 2))}
        />
      </div>
      <div className="flex h-full items-start w-full justify-start flex-col p-2">
        <p className="text-lg my-1 font-medium">{props.name}</p>
        <p className="text-lg text-blue-400 my-0 font-medium">
          Sale Price: $ {props.salePrice.toFixed(2)}
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
      </div>
    </div>
  );
};

const MAX_ITEM_PER_PAGE = 10;

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [page, setPage] = useState<number>(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
    <div className="w-full max-w-[1430px] mx-auto h-full">
      <div className="flex h-12 items-center justify-between px-5 mt-5">
        <h2 className="font-bold">Products</h2>
        <Button
          size="large"
          variant="contained"
          className="capitalize"
          onClick={() => navigate("/products/add-product")}
        >
          Add new Product
        </Button>
      </div>
      <Stack
        spacing={2}
        className="h-[calc(100dvh-160px)] overflow-y-scroll scrollBar px-5 mt-5"
      >
        {productList.length > 0 ? (
          productList
            .slice((page - 1) * MAX_ITEM_PER_PAGE, page * MAX_ITEM_PER_PAGE)
            .map((item) => <ProductItem key={item.id} {...item} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg">Loading...</p>
          </div>
        )}
        <Stack
          spacing={2}
          className="flex items-center justify-center w-full mt-auto mb-2"
        >
          <Pagination
            count={Math.ceil(productList.length / MAX_ITEM_PER_PAGE)}
            page={page}
            size="large"
            onChange={handleChangePage}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default Products;
