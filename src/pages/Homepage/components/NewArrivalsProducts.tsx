import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ProductProps } from "../../Products/Products";
import { getProductList } from "../../../api/ProductApi";
import { toast } from "../../../utils/Toastify";
import ProductItem from "./components/ProductItem";
import Grid2 from "@mui/material/Grid2";

const NewArrivalsProducts = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [row, setRow] = useState<number>(1);

  const handleShowMore = () => {
    setRow((prev) => prev + 1);
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
    <div className="w-full my-[20px] mt-[40px] mb-10">
      <h2 className="mx-[auto]"> New Arrivals 2023</h2>
      <Grid2 container spacing={4}>
        {productList.length > 0 ? (
          productList.slice(0, 4 * row).map((item) => (
            <Grid2 size={3}>
              <ProductItem key={item.id} {...item} />
            </Grid2>
          ))
        ) : (
          <Grid2 size={12}>
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold text-lg"> Loading... </p>
            </div>
          </Grid2>
        )}
      </Grid2>

      <div className="w-full items-center justify-center flex mt-[25px]">
        {row * 4 < productList.length ? (
          <Button
            variant="contained"
            className="bg-black text-white mt-5 capitalize"
            onClick={handleShowMore}
          >
            See more Products
          </Button>
        ) : (
          <Button
            variant="contained"
            className="bg-black text-white capitalize rounded-lg"
            onClick={() => setRow(1)}
          >
            Hide Products
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewArrivalsProducts;
