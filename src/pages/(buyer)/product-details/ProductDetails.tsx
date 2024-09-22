import { Box, Button, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoHexagon,
} from "@tabler/icons-react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductDetails = () => {
  const { slug } = useParams();
  const [like, setLike] = useState<boolean>(true);

  const [selectedRam, setSelectedRam] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  const handleOpenModal = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="w-full h-full max-w-[1430px] mx-auto my-5">
      <Grid2 className="w-full" container spacing={2}>
        <Grid2 size={8}>
          <ImageGallery imagesList={product_data.imageURL} onClickImage={handleOpenModal}/>
        </Grid2>
        <Grid2 size={4} className="p-5">
        <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Image Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            padding: 0,
            border: 'none',
            background: 'transparent'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <div className="relative">
          {/* Nút "X" để đóng modal */}
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            X
          </button>

          {/* Ảnh phóng to */}
          <img
            src={currentImage}
            alt="Phóng to sản phẩm"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </Modal>
          <div className="flex items-start justify-between w-full">
            <div className="w-[70%]">
              <Typography variant="h4" component="h2">
                {product_data.name}
              </Typography>
              <p className="font-semibold text-gray-400 my-0">
                {product_data.categories[0].name}
              </p>
            </div>
            <p className="font-semibold w-[30%] my-0 text-[28px] text-right mt-1 text-gray-600">
              ${product_data.price}
            </p>
          </div>

          {/* Colors Section */}
          <div className="flex flex-col items-start justify-center my-4">
            <p className="mb-2 font-semibold">Colors<span className="font-normal text-lg">{selectedColor ? `: ${selectedColor}` : ""}</span></p>

            <Grid2 container spacing={2}>
              {["Lightgray", "Lightgreen", "White", "Lightblue"].map(
                (item, index) => (
                  <Grid2 size={3} key={index}>
                    <Box
                      className={`min-w-[70px] min-h-[70px] shadow-lg rounded-md flex items-center justify-center cursor-pointer hover:border-gray-600 bg-{item}`}
                      style={{ backgroundColor: item }} onClick={() => setSelectedColor(item)}
                    >
                      <span
                        className={`text-sm font-medium ${
                          item === "White" ? "text-black" : "text-white"
                        }`}
                      >
                        {item}
                      </span>
                    </Box>
                  </Grid2>
                )
              )}
            </Grid2>
          </div>

          {/* RAM Section */}
          <div className="flex flex-col items-start justify-center my-4">
            <p className="mb-2 font-semibold">RAM<span className="font-normal text-lg">{selectedRam ? `: ${selectedRam}` : ""}</span></p>
            <div className="flex space-x-2">
              {["8GB", "16GB", "32GB"].map((ramOption, index) => (
                <Box
                  key={index}
                  className="border-2 border-solid border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer hover:border-gray-600" onClick={() => setSelectedRam(ramOption)}
                >
                  {ramOption}
                </Box>
              ))}
            </div>
          </div>

          {/* Storage Section */}
          <div className="flex flex-col items-start justify-center my-4">
            <p className="mb-2 font-semibold">Storage<span className="font-normal text-lg">{selectedStorage ? `: ${selectedStorage}` : ""}</span></p>
            <div className="flex space-x-2">
              {["256GB SSD", "512GB SSD", "1TB SSD"].map(
                (storageOption, index) => (
                  <Box
                    key={index}
                    className="border-2 border-solid border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer hover:border-gray-600" onClick={() => setSelectedStorage(storageOption)}
                  >
                    {storageOption}
                  </Box>
                )
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-start gap-1">
            <IconInfoHexagon size={22} color={"gray"} />
            <span className="font-medium text-gray-500">
              {product_data.remainingQuantity || 19} item left!
            </span>
          </div>

          <p className="mt-10 mb-1 text-sm text-gray-500">
            Delivery on Match 5th-11th
          </p>
          <div className="w-full flex items-center justify-center gap-2 ">
            <Button
              className="bg-black text-white w-full capitalize"
              variant="contained"
              size="large"
            >
              Add to cart
            </Button>
            <div
              onClick={() => setLike((prev) => !prev)}
              className="flex items-center justify-center p-2 bg-slate-100 z-100 border-[0.5px] rounded-md border-solid border-black bg-opacity-80 cursor-pointer"
            >
              {like ? <IconHeart /> : <IconHeartFilled  />}
            </div>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ProductDetails;

const product_data = {
  id: 47,
  name: "Lenovo Ideapad Slim 5 ",
  imageURL: [
    "https://ecommercespringbootneo4j.s3.ap-southeast-2.amazonaws.com/product/47/image_9723282190628900355laptop1.jpeg",
    "https://ecommercespringbootneo4j.s3.ap-southeast-2.amazonaws.com/product/47/image_1508006977430756828laptop2.jpeg",
  ],
  primaryImageURL:
    "https://ecommercespringbootneo4j.s3.ap-southeast-2.amazonaws.com/product/47/image_9723282190628900355laptop1.jpeg",
  description:
    "<ul><li><p>Sở hữu thiết kế tinh tế với lớp vỏ nhôm sáng bóng, sang trọng</p></li><li><p>Màn hình 14 inch&nbsp;WUXGA cực sắc nét, hỗ trợ làm việc, giải trí dễ dàng</p></li><li><p>CPU&nbsp;Intel Core i5-12450H mạnh mẽ, giải quyết nhanh mọi tác vụ học tập, văn phòng</p></li><li><p>RAM 16GB cùng ổ cứng&nbsp;512GB SSD đa nhiệm, mở máy, mở ứng dụng cực nhanh</p></li><li><p>Độ sáng lên đến 300nits hỗ trợ làm việc ở nơi có ánh sáng yếu</p></li></ul>",
  msrp: 190.0,
  salePrice: 240.0,
  price: 270.0,
  rating: null,
  viewCount: 1,
  quantity: 12,
  quantitySold: 0,
  remainingQuantity: 0,
  brandName: null,
  sellingTypes: "In-store selling only",
  createdAt: "2024-09-04T08:21:32.525954225",
  updatedAt: null,
  categories: [
    {
      id: 2,
      name: "Electronic",
      level: 0,
      createdAt: null,
      updatedAt: null,
      subCategory: [
        {
          id: 55,
          name: "Laptop",
          level: 0,
          createdAt: "2024-09-03T16:27:54.491758854",
          updatedAt: null,
          subCategory: [],
          noOfViews: 0,
          productsSold: 0,
        },
        {
          id: 44,
          name: "Smart Phone",
          level: 0,
          createdAt: "2024-09-03T16:15:23.149005144",
          updatedAt: null,
          subCategory: [],
          noOfViews: 0,
          productsSold: 0,
        },
      ],
      noOfViews: 0,
      productsSold: 0,
    },
    {
      id: 44,
      name: "Smart Phone",
      level: 0,
      createdAt: "2024-09-03T16:15:23.149005144",
      updatedAt: null,
      subCategory: [],
      noOfViews: 0,
      productsSold: 0,
    },
  ],
  dimensions: {
    id: 48,
    weight: 1.8,
    length: 12.0,
    width: 12.0,
    height: 12.0,
  },
  sku: "11121231",
};
