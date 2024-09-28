import React, { useEffect, useState } from "react";
import { getProductList } from "../../../../api/ProductApi";
import { toast } from "../../../../utils/Toastify";
import { Button, Grid2 } from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { fakeProductList } from "../../../../constants/constant_product_list";
import { ProductProps } from "../../../../types/product_types";
import ProductItem from "../../home-page/components/components/ProductItem";

const RelatedProducts = () => {
  const [productList, setProductList] =
    useState<ProductProps[]>(fakeProductList);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeIndex = (action: string) => {
    switch (action) {
      case "next":
        if (index + 1 < productList.length / 4) setIndex((prev) => prev + 1);
        break;
      case "previous":
        if (index > 0) setIndex((prev) => prev - 1);
        break;
      default:
        break;
    }
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
        console.log("Populars", productsData);
        setProductList(productsData);
      } catch (error: any) {
        // toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-[20px] mt-[40px] mb-10 transition-all">
      <div className="w-full flex item-center justify-between">
        <h2> Related Products</h2>
        <div className="flex items-center justify-center gap-3">
          <Button
            className="w-[40px] h-[40px] bg-slate-100 flex items-center justify-center rounded-full text-[20px] font-bold"
            onClick={() => handleChangeIndex("previous")}
            style={{ minWidth: "40px", minHeight: "40px", borderRadius: "50%" }}
          >
            <IconChevronLeft color={"black"} />
          </Button>
          <Button
            className="w-[40px] h-[40px] bg-slate-100 flex items-center justify-center rounded-full text-[20px] font-bold"
            onClick={() => handleChangeIndex("next")}
            style={{ minWidth: "40px", minHeight: "40px", borderRadius: "50%" }}
          >
            <IconChevronRight color={"black"} />
          </Button>
        </div>
      </div>
      <Grid2 container spacing={4} className="transition-all">
        {productList.length > 0 ? (
          productList.slice(index * 4, (index + 1) * 4).map((item, index) => (
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
    </div>
  );
};

export default RelatedProducts;
