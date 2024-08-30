import { Button, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

interface BannerProp {
  cover_url: string;
  direct_path: string;
}

interface BannerCarouselProps {
  banner_list: BannerProp[];
}

const bannerList: BannerProp[] = [
  {
    cover_url:
      "https://plus.unsplash.com/premium_photo-1665159465178-5ee4067d6001?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    direct_path: "/course-outline",
  },
  {
    cover_url:
      "https://images.unsplash.com/photo-1724752286363-846076c705a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    direct_path: "/outline-generator",
  },
  {
    cover_url:
      "https://images.unsplash.com/photo-1724752286363-846076c705a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    direct_path: "/ai-buildere",
  },
  {
    cover_url:
      "https://images.unsplash.com/photo-1724752286363-846076c705a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    direct_path: "/course-outline",
  },
];

const Banner = (props: BannerProp) => {
  return (
    <Paper
      elevation={3}
      style={{
        backgroundImage: `url(${props.cover_url})`,
        backgroundPosition: "center",
        backgroundSize: "fill",
        margin: "0 auto",
        height: "400px",
        color: "white",
        width: "95%",
      }}
    >
      <Button>Shop now</Button>
    </Paper>
  );
};

const BannerCarousel = () => {
  return (
    <div className="mx-auto">
      <Carousel>
        {bannerList.map((item, i) => (
          <Banner
            key={i}
            cover_url={item.cover_url}
            direct_path={item.direct_path}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
