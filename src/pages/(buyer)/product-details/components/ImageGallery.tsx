import React, { useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Dialog, Grid2, Paper } from "@mui/material";
import { useAppSelector } from "../../../../store/store";
import { IconZoomScan } from "@tabler/icons-react";

interface BannerProp {
  cover_url: string;
  color: string;
  height: string;
  image_object: string;
  type?: string;
  activeZoom: boolean;
  handleClickOpen: () => void;
}

const Banner: React.FC<BannerProp> = (props) => {
  const [zoomX, setZoomX] = useState<any>(0);
  const [zoomY, setZoomY] = useState<any>(0);
  const [zoomIn, setZoomIn] = useState<any>(false);
  const elementRef = useRef<any>(null);

  const handleMouseMove = (event: any) => {
    if (props.type === "fullScreen") return;

    const element = elementRef.current;
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      setZoomX((event.nativeEvent.layerX / width) * 100);
      setZoomY((event.nativeEvent.layerY / height) * 100);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        backgroundImage: `url(${props.cover_url})`,
        backgroundPosition: props.image_object,
        color: props.color,
        height: props.height,
        margin: "0 auto",
        position: "relative",
        borderRadius: "5px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
      className="zoomImage"
      onDoubleClick={() => props.handleClickOpen()}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZoomIn(true)}
      onMouseLeave={() => setZoomIn(false)}
    >
      {props.type !== "fullScreen" && (
        <Box
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${props.cover_url})`,
            backgroundSize: "200%",
            backgroundPosition: `${zoomX}%  ${zoomY}%`,
            display:
              props.activeZoom === true && zoomIn === true ? "block" : "none",
          }}
          ref={elementRef}
          className={`${
            props.activeZoom === true && zoomIn === true ? "cursor-zoom-in" : ""
          }`}
        />
      )}
    </Paper>
  );
};

const ImageGallery = () => {
  const imageUrls = useAppSelector((state) => state.detail?.imageURLs);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeZoom, setActiveZoom] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    setActiveZoom(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const image_list = imageUrls?.map((item) => ({
    cover_url: item,
    image_object: "center",
    color: "black",
  }));

  return (
    <div className="mx-auto w-full">
      <Grid2 className="w-full" container spacing={2}>
        <Grid2 size={1.5} className="relative py-3">
          <Box
            className={`absolute z-50 top-2 -right-10 w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer`}
            onClick={() => setActiveZoom((prev) => !prev)}
          >
            <IconZoomScan
              size={25}
              color={activeZoom ? "black" : "lightgray"}
            />
          </Box>
          <Box className="w-full px-2 flex flex-col items-center gap-2 overflow-y-scroll max-h-[500px] scrollBar">
            {image_list.map((item, index) => (
              <Box
                className={`w-full min-h-[80px] flex items-center justify-center rounded-sm overflow-hidden border-[2px] border-solid border-gray-300 cursor-pointer ${
                  activeIndex === index
                    ? "scale-105 border-[black]"
                    : "opacity-50"
                }`}
                key={index}
                onClick={() => setActiveIndex(index)}
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
        <Grid2 size={10.5}>
          <Box className="rounded-lg p-3 px-5">
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
                  activeZoom={activeZoom}
                  cover_url={item.cover_url}
                  color={item.color}
                  image_object={item.image_object}
                  handleClickOpen={handleClickOpen}
                  height="500px"
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
          <Box className="w-[80vw] h-[70vh] mt-[10vh] mx-auto px-20">
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
                  activeZoom={activeZoom}
                  cover_url={item.cover_url}
                  color={item.color}
                  image_object={item.image_object}
                  handleClickOpen={handleClickOpen}
                  height="70vh"
                  type="fullScreen"
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
