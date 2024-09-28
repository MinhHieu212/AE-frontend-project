import React, { useEffect, useState } from "react";
import { Button, Pagination, Skeleton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../../api/ProductApi";
import { toast } from "../../../utils/Toastify";
import { ProductProps } from "../../../types/product_types";
import Grid from "@mui/material/Grid2";
import { fakeProductList } from "../../../constants/constant_product_list";

const MAX_ITEM_PER_PAGE = 12;

interface ProductItemProps {
  item?: ProductProps;
  loading?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, loading }) => {
  const navigate = useNavigate();
  const fallbackImageURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s";

  return (
    <div className="w-full mx-auto mb-2 p-3 rounded-xl flex items-start justify-start gap-3 border-2 border-solid border-gray-100 bg-[#fbfdff] shadow-lg">
      <div className="w-[280px] h-[180px] rounded-md overflow-hidden">
        {loading ? (
          <Skeleton animation="wave" className="w-[280px] h-full" />
        ) : (
          <img
            src={
              item?.primaryImageURL ? item?.primaryImageURL : fallbackImageURL
            }
            alt={`Product: ${item?.name}`}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => navigate(`/products/${item?.id}`)}
          />
        )}
      </div>

      <div className="flex h-full items-start w-full justify-start flex-col p-2">
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-md my-1 font-medium w-[100px] h-full"
          />
        ) : (
          <p className="text-lg my-1 font-medium">{item?.name}</p>
        )}
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-md text-blue-400 my-0 font-medium w-[100px]"
          />
        ) : (
          <p className="text-md text-blue-400 my-0 font-medium">
            Sale Price: $ {item?.salePrice?.toFixed(2) || 0}
          </p>
        )}
        {loading ? (
          <Skeleton
            animation="wave"
            className="text-[14px] my-1 font-medium w-[100px]"
          />
        ) : (
          <p className="text-sm my-1 font-medium text-[gray]">
            Price: ${item?.price?.toFixed(2) || 0}
          </p>
        )}

        {loading ? (
          <Skeleton
            animation="wave"
            className="text-lg my-1 font-medium w-[150px]"
          />
        ) : (
          <p className="text-sm my-1">
            {item?.categories.map(
              (sub_item, index) =>
                `${sub_item.name} ${
                  index !== item?.categories.length - 1 ? " & " : ""
                }`
            )}
          </p>
        )}

        {loading ? (
          <Skeleton
            animation="wave"
            className="text-lg my-1 font-medium w-[100px]"
          />
        ) : (
          <p className="text-sm my-1 font-medium text-[gray]">
            Sell on: {item?.sellingTypes}
          </p>
        )}
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState<ProductProps[]>([
    ...fakeProductList,
    ...fakeProductList,
  ]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const params = {
          limit: 10,
          page: 0,
          size: 100,
        };
        const response_data = await getProductList(params);
        const productsData = response_data.content;
        console.log("Product List:", productsData);
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
    <div className="w-full max-w-[1300px] p-3 mx-auto h-full">
      <div className="flex h-12 items-center justify-between px-5">
        <h2 className="font-bold text-[lighgray] text-[22px]">All Products</h2>
        <Button
          variant="contained"
          className="capitalize bg-darkGreen text-myGray"
          onClick={() => navigate("/products/add-product")}
        >
          Add new Product
        </Button>
      </div>
      <Grid
        container
        spacing={2}
        columns={12}
        className="max-h-[calc(100dvh-155px)] items-start overflow-y-scroll scrollBar px-5 mt-5"
      >
        {productList.length > 0 ? (
          productList
            .slice((page - 1) * MAX_ITEM_PER_PAGE, page * MAX_ITEM_PER_PAGE)
            .map((item) => (
              <Grid size={6}>
                <ProductItem key={item.id} item={item} loading={loading} />
              </Grid>
            ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-bold text-lg">No Products</p>
          </div>
        )}
        <Stack
          spacing={2}
          className="flex items-center justify-center pt-2 w-full mt-auto mb-2"
        >
          <Pagination
            count={Math.ceil(productList.length / MAX_ITEM_PER_PAGE)}
            page={page}
            size="large"
            onChange={handleChangePage}
          />
        </Stack>
      </Grid>
    </div>
  );
};

export default ProductList;
