import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getProductList } from "../../../../api/ProductApi";
import { toast } from "../../../../utils/Toastify";
import ProductItem from "./components/ProductItem";
import Grid2 from "@mui/material/Grid2";
import { fakeProductList } from "../../../../fake_data/fake_data_products";
import { ProductProps } from "../../../../types/product_types";

const NewArrivals = () => {
  const [productList, setProductList] =
    useState<ProductProps[]>(fakeProductList);
  const [row, setRow] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowMore = () => {
    setRow((prev) => prev + 1);
  };

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      try {
        const params = {
          limit: 10,
          page: 0,
          size: 100,
        };
        const response_data = await getProductList(params);
        const productsData = response_data.content;
        console.log("NewArrivals", productsData);
        setProductList(productsData);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-[20px] mt-[40px] mb-10">
      <h2 className="mx-[auto] text-[22px]"> New Arrivals 2023</h2>
      <Grid2 container spacing={4}>
        {productList.length > 0 ? (
          productList.slice(0, 4 * row).map((item, index) => (
            <Grid2 size={3} key={index}>
              <ProductItem key={item.id} item={item} loading={loading} />
            </Grid2>
          ))
        ) : (
          <Grid2 size={12}>
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold text-lg"> No Products </p>
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

export default NewArrivals;
