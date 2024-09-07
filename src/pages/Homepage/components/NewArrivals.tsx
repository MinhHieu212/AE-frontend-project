import React, { useEffect, useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { ProductProps } from "../../Products/Products";
import { getProductList } from "../../../api/ProductApi";
import { toast } from "../../../utils/Toastify";
import { IconStarFilled } from "@tabler/icons-react";
import ProductItem from "./components/ProductItem";

const NewArrivals = () => {
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
    <div className="w-full my-[20px] mt-[40px] mb-10">
      <h2 className="mx-[auto]"> New Arrivals 2023</h2>
      <div className="overflow-x-scroll flex items-start justify-start gap-14 mx-[auto]">
        {productList.length > 0 ? (
          productList.map((item) => <ProductItem key={item.id} {...item} />)
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg"> Loading... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
