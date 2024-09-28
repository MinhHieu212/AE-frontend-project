import React, { useEffect, useState } from "react";
import { getProductList } from "../../../../api/ProductApi";
import { toast } from "../../../../utils/Toastify";
import ProductItem from "./components/ProductItem";
import { Button, Grid, Grid2, useMediaQuery, useTheme } from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { fakeProductList } from "../../../../constants/constant_product_list";
import { ProductProps } from "../../../../types/product_types";

const Populars = () => {
  const [productList, setProductList] =
    useState<ProductProps[]>(fakeProductList);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));

  const getItemsPerPage = () => {
    if (isXs) return 2;
    if (isSm) return 3;
    if (isMd) return 3;
    return 4;
  };

  const itemsPerPage = getItemsPerPage();

  const handleChangeIndex = (action: string) => {
    switch (action) {
      case "next":
        if (index + 1 < Math.ceil(productList.length / itemsPerPage))
          setIndex((prev) => prev + 1);
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
    <div className="w-full my-[20px] mt-[40px] mb-10 transition-all px-0">
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <h2 className="text-[18px] sm:text-[22px] mb-4 sm:mb-0">
          Popular Products 2023
        </h2>
        <div className="flex items-center justify-center gap-3">
          <Button
            className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-slate-100 flex items-center justify-center rounded-full text-[18px] sm:text-[20px] font-bold"
            onClick={() => handleChangeIndex("previous")}
            style={{ minWidth: "36px", minHeight: "36px", borderRadius: "50%" }}
          >
            <IconChevronLeft color={"black"} size={20} />
          </Button>
          <Button
            className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-slate-100 flex items-center justify-center rounded-full text-[18px] sm:text-[20px] font-bold"
            onClick={() => handleChangeIndex("next")}
            style={{ minWidth: "36px", minHeight: "36px", borderRadius: "50%" }}
          >
            <IconChevronRight color={"black"} size={20} />
          </Button>
        </div>
      </div>
      <Grid2 container spacing={2} className="transition-all">
        {productList.length > 0 ? (
          productList
            .slice(index * itemsPerPage, (index + 1) * itemsPerPage)
            .map((item, index) => (
              <Grid2 size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={index}>
                <ProductItem key={item.id} item={item} loading={loading} />
              </Grid2>
            ))
        ) : (
          <Grid2 size={12}>
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold text-lg">No Products</p>
            </div>
          </Grid2>
        )}
      </Grid2>
    </div>
  );
};

export default Populars;
