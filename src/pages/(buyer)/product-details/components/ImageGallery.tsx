import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

interface BannerProp {
  cover_url: string;
  direct_path: string;
  color: string;
  image_object: string;
}

const Banner: React.FC<BannerProp> = (props) => {
  return (
    <Paper
      elevation={3}
      style={{
        backgroundImage: `url(${props.cover_url})`,
        backgroundPosition: props.image_object,
        color: props.color,
        width: "100%",
        height: "600px",
        margin: "0 auto",
        position: "relative",
        borderRadius: "15px",
        backgroundSize: "fill",
        backgroundRepeat: "no-repeat",
      }}
    ></Paper>
  );
};

interface ImageGalleryProps {
  imagesList: string[];
  onClickImage: (imageUrl: string) => void;

}

// const ImageGallery: React.FC<ImageGalleryProps> = ({ imagesList, onClickImage }) => {
//   const image_list = imagesList.map((item) => ({
//     cover_url: item,
//     image_object: "center",
//     color: "black",
//     direct_path: "/",
//   }));

//   return (
//     <div className="mx-auto w-full mb-10">
//       <Carousel
//         next={() => {}}
//         prev={() => {}}
//         indicatorContainerProps={{
//           style: {
//             position: "absolute",
//             bottom: "10px",
//             left: "30px",
//             display: "flex",
//             justifyContent: "flex-start",
//             alignItems: "center",
//           },
//         }}
//       >
//         {image_list.map((item, i) => (
//           <
//             key={i}
//             cover_url={item.cover_url}
//             direct_path={item.direct_path}
//             color={item.color}
//             image_object={item.image_object}
//           />
//         ))}
//         </Carousel>
//       </div>
//     );
//   }

const ImageGallery: React.FC<ImageGalleryProps> = ({ imagesList, onClickImage }) => {
  const image_list = imagesList.map((item) => ({
    cover_url: item,
    image_object: "cover",
    color: "black",
    direct_path: "/",
  }));

  return (
    <div className="mx-auto w-full mb-10">
      <Carousel
        next={() => {}}
        prev={() => {}}
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
          <img
          key={i}
          src={item.cover_url}
          alt={`Image ${i}`}
          style={{cursor: "pointer" }}
          onClick={() => onClickImage(item.cover_url)}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageGallery;
