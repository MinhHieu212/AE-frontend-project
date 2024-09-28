// import { Button, Paper } from "@mui/material";
// import { IconGardenCart } from "@tabler/icons-react";
// import React, { useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import { getBanner } from "../../../../api/BannerApi";
// import { toast } from "../../../../utils/Toastify";

// interface BannerProp {
//   cover_url: string;
//   color: string;
//   image_object: string;
//   size?: string;
// }

// const Banner = (props: BannerProp) => {
//   return (
//     <Paper
//       elevation={3}
//       style={{
//         backgroundImage: `url(${props.cover_url})`,
//         backgroundPosition: props.image_object,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: props.size || "cover",
//         margin: "0 auto",
//         height: "600px",
//         color: props.color,
//         width: "100%",
//         borderRadius: "15px",
//         position: "relative",
//       }}
//     >
//       <div className="absolute bottom-[140px] left-[100px]">
//         <div className="flex-col flex items-start justify-center">
//           <p className="text-[40px] my-0 font-bold">New Year Sale</p>
//           <p className="text-[40px] my-0 font-bold">Offer 2024</p>
//           <p className="text-[50px] my-0 font-bold">20% OFF</p>
//         </div>
//         <Button
//           className={`${
//             props.color !== "white" ? "bg-black" : "bg-darkGreen"
//           } text-myGray flex items-center justify-center`}
//           variant="contained"
//           size="large"
//         >
//           <IconGardenCart className="mr-2" size={22} />
//           <span className={`capitalize mt-[1px]`}>Shopping now</span>
//         </Button>
//       </div>
//     </Paper>
//   );
// };

// const Banners = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [banners, setBanners] = useState<BannerProp[]>(bannerList);

//   useEffect(() => {
//     const callApi = async () => {
//       setLoading(true);
//       try {
//         const response_data = await getBanner();
//         const banner_data = response_data.slice(0, 5).map((item: any) => {
//           return {
//             cover_url: item.url,
//             image_object: "cover",
//             color: "black",
//           };
//         });
//         console.log("Banners", banner_data);
//         setBanners(banner_data);
//       } catch (error: any) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     callApi();
//   }, []);

//   return (
//     <div className="mx-auto w-full mb-10 max-h-[600px]">
//       <Carousel
//         next={() => {}}
//         prev={() => {}}
//         autoPlay={false}
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
//         className="h-[600px]"
//       >
//         {banners.map((item, i) => (
//           <Banner
//             key={i}
//             cover_url={item.cover_url}
//             color={item.color}
//             size={item.size}
//             image_object={item.image_object}
//           />
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Banners;

import { Button, Paper } from "@mui/material";
import { IconGardenCart } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { getBanner } from "../../../../api/BannerApi";
import { toast } from "../../../../utils/Toastify";

interface BannerProp {
  cover_url: string;
  color: string;
  image_object: string;
  size?: string;
}

const Banner = (props: BannerProp) => {
  return (
    <Paper
      elevation={3}
      className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      style={{
        backgroundImage: `url(${props.cover_url})`,
        backgroundPosition: props.image_object,
        backgroundRepeat: "no-repeat",
        backgroundSize: props.size || "cover",
        margin: "0 auto",
        minHeight: "300px",
        color: props.color,
        width: "100%",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      <div className="absolute bottom-[10%] left-[5%] sm:bottom-[20%] sm:left-[10%]">
        <div className="flex-col flex items-start justify-center">
          <p className="text-2xl sm:text-3xl md:text-4xl my-0 font-bold">
            New Year Sale
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl my-0 font-bold">
            Offer 2024
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl my-0 font-bold">
            20% OFF
          </p>
        </div>
        <Button
          className={`${
            props.color !== "white" ? "bg-black" : "bg-darkGreen"
          } text-myGray flex items-center justify-center mt-4`}
          variant="contained"
          size="large"
        >
          <IconGardenCart className="mr-2" size={22} />
          <span className={`capitalize mt-[1px]`}>Shopping now</span>
        </Button>
      </div>
    </Paper>
  );
};

const Banners = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [banners, setBanners] = useState<BannerProp[]>(bannerList);

  // useEffect(() => {
  //   const callApi = async () => {
  //     setLoading(true);
  //     try {
  //       const response_data = await getBanner();
  //       const banner_data = response_data.slice(0, 5).map((item: any) => {
  //         return {
  //           cover_url: item.url,
  //           image_object: "cover",
  //           color: "black",
  //         };
  //       });
  //       console.log("Banners", banner_data);
  //       setBanners(banner_data);
  //     } catch (error: any) {
  //       // toast.error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   callApi();
  // }, []);

  return (
    <div className="mx-auto w-full mb-10 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <Carousel
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
        className="h-full"
      >
        {banners.map((item, i) => (
          <Banner
            key={i}
            cover_url={item.cover_url}
            color={item.color}
            size={item.size}
            image_object={item.image_object}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Banners;

const bannerList: BannerProp[] = [
  {
    cover_url:
      "https://www.maxis.com.my/content/dam/mxs/images/rebrand/devices/iphone-15/outright-sales/herobanner-mobile.webp",
    image_object: "center",
    color: "black",
  },
  {
    cover_url:
      "https://cuahangsamsung.vn/filemanager/userfiles/hinh-san-pham/banner/samsung-banner-watch.png",
    image_object: "center",
    color: "black",
  },
  {
    cover_url:
      "https://www.vodacombusiness.co.za/sites/vodacombusinesscoza/files/styles/extra_large_landscape/public/2022-11/vb_desktopbanner_1920x720_iphone_14_pro1.jpg?itok=i2n1frC_",
    image_object: "top",
    color: "white",
  },
  {
    cover_url:
      "https://vatvostudio.vn/wp-content/uploads/2023/01/GALAXY-S23-SERIES-LO-ANH-POSTER-TRUOC-NGAY-RA-MAT.jpg",
    image_object: "top",
    color: "white",
  },
  {
    cover_url:
      "https://vatvostudio.vn/wp-content/uploads/2023/01/Galaxy-S23-series-lo-poster-truoc-ngay-ra-mat-6.jpg",
    image_object: "center",
    color: "white",
  },
];
