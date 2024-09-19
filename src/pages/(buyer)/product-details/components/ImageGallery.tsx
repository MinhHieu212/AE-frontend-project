import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Dialog, Grid2, Paper, Stack } from "@mui/material";
import { useAppSelector } from "../../../../store/store";

interface BannerProp {
  cover_url: string;
  color: string;
  height: string;
  width: string;
  image_object: string;
  handleClickOpen: () => void;
}

const Banner: React.FC<BannerProp> = (props) => {
  return (
    <Paper
      elevation={3}
      style={{
        backgroundImage: `url(${props.cover_url})`,
        backgroundPosition: props.image_object,
        color: props.color,
        width: props.width,
        height: props.height,
        margin: "0 auto",
        position: "relative",
        borderRadius: "5px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      onDoubleClick={() => props.handleClickOpen()}
    />
  );
};

const ImageGallery = () => {
  const imageUrls = useAppSelector((state) => state.details.imageURLs);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const image_list = imageUrls.map((item) => ({
    cover_url: item,
    image_object: "center",
    color: "black",
  }));

  return (
    <div className="mx-auto w-full">
      <Grid2 className="w-full" container spacing={2}>
        <Grid2 size={1.5}>
          <Box className="w-full p-2 flex flex-col items-center gap-2 overflow-y-scroll max-h-[600px] scrollBar">
            {image_list.map((item, index) => (
              <Box
                className={`w-full min-h-[80px] flex items-center justify-center rounded-md overflow-hidden border-2 border-solid border-gray-300 cursor-pointer ${
                  activeIndex === index && "border-gray-500 scale-105"
                }`}
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <img
                  src={item.cover_url}
                  alt="colum product images"
                  className="w-full h-full object-contain"
                />
              </Box>
            ))}
          </Box>
        </Grid2>
        <Grid2 size={10.5} className="px-5">
          <Box className="rounded-lg p-3">
            <Carousel
              index={activeIndex}
              onChange={(index: any) => setActiveIndex(index)}
              next={() => {}}
              prev={() => {}}
              autoPlay={false}
              indicatorContainerProps={{
                style: {
                  position: "absolute",
                  bottom: "10px",
                  left: "30px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              }}
            >
              {image_list.map((item, i) => (
                <Banner
                  key={i}
                  cover_url={item.cover_url}
                  color={item.color}
                  image_object={item.image_object}
                  handleClickOpen={handleClickOpen}
                  height="600px"
                  width="100%"
                />
              ))}
            </Carousel>
          </Box>
        </Grid2>
      </Grid2>

      <React.Fragment>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <Box className="w-full flex items-center justify-end mt-2 px-2">
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Box>
          <Box className="w-full mt-32 px-20">
            <Carousel
              index={activeIndex}
              onChange={(index: any) => setActiveIndex(index)}
              next={() => {}}
              prev={() => {}}
              autoPlay={false}
              indicatorContainerProps={{
                style: {
                  position: "absolute",
                  bottom: "10px",
                  left: "30px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              }}
            >
              {image_list.map((item, i) => (
                <Banner
                  key={i}
                  cover_url={item.cover_url}
                  color={item.color}
                  image_object={item.image_object}
                  handleClickOpen={handleClickOpen}
                  height="800px"
                  width="92vw"
                />
              ))}
            </Carousel>
          </Box>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default ImageGallery;
