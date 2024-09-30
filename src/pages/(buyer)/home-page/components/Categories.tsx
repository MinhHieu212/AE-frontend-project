import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { toast } from "../../../../utils/Toastify";
import { constant_category } from "../../../../constants/constant_category";
import DynamicIcon from "../../../../components/DynamicIcon";
import { getCategories } from "../../../../api/CategoryApi";

export interface CategoryProps {
  id: number;
  name: string;
  parentId: number | null;
  subCategories: CategoryProps[];
  icon?: string;
}

const CategoryItem = (props: CategoryProps) => {
  return (
    <Box className="rounded-lg min-w-[80px] max-w-[80px] sm:min-w-[100px] sm:max-w-[100px] flex items-center justify-center flex-col mx-1 sm:mx-2">
      <div className="flex items-center justify-center p-3 sm:p-4 rounded-full bg-gray-200 shadow-md">
        <DynamicIcon iconName={props.icon || "Smartphone"} size="medium" />
      </div>
      <p className="text-xs sm:text-sm my-1 mt-2 font-medium text-[gray] capitalize truncate w-full text-center">
        {props.name || "no name"}
      </p>
    </Box>
  );
};

const Categories = () => {
  const [categories, setCategories] =
    useState<CategoryProps[]>(constant_category);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callApi = async () => {
      try {
        const response_data = await getCategories();
        const categoriesData = response_data.map((item: any) => ({
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          subCategories: item.subCategories,
          icon: item.icon,
        }));
        // console.log("Categories", categoriesData);
        setCategories(categoriesData);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full my-4 sm:my-[20px] mt-6 sm:mt-10 mb-6 sm:mb-10">
      <h2 className="text-[16px] sm:text-[18px] md:text-[22px] mb-2 sm:mb-4">
        Our Top Categories
      </h2>
      <div className="overflow-x-auto flex items-start justify-start mx-auto scrollBar">
        <div className="flex items-start justify-start">
          {loading ? (
            <div className="w-full h-20 flex items-center justify-center">
              <p className="font-bold text-base sm:text-lg">Loading...</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((item) => <CategoryItem key={item.id} {...item} />)
          ) : (
            <div className="w-full h-20 flex items-center justify-center">
              <p className="font-bold text-base sm:text-lg">
                No categories found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
