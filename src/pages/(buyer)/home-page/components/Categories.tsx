import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ProductProps } from "../../../(seller)/product-list/ProductList";
import { getProductList } from "../../../../api/ProductApi";
import { toast } from "../../../../utils/Toastify";
import { fake_data_categorys } from "../../../../fake_data/fake_data_category";
import { IconAdCircle } from "@tabler/icons-react";
import { CategoryProps } from "../../../(seller)/add-product/types/ProductFormProps";

const CategoryItem = (props: CategoryProps) => {
  return (
    <Box className="rounded-lg w-[300px] flex items-center justify-center flex-col">
      <div className="flex items-center justify-center p-3 rounded-full bg-slate-200">
        <IconAdCircle size={25} />
      </div>
      <p className="text-sm my-1 font-medium text-[gray] capitalize">
        {props.name || "no name"}
      </p>
    </Box>
  );
};

const Categories = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const response_data = await getProductList();
        setProductList(response_data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-[20px] mt-10 mb-10">
      <h2 className="mx-[auto]"> Our Top Categories </h2>
      <div className="overflow-x-scroll flex items-start justify-start gap-8 mx-[auto]">
        {fake_data_categorys.length > 0 ? (
          fake_data_categorys.map((item) => (
            <CategoryItem key={item.id} {...item} />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg"> Loading... </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
