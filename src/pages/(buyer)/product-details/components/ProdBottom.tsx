import React from "react";
import { useMediaQuery } from "@mui/material";

const ProdBottom = () => {
  const isMobile = useMediaQuery("(max-width:800px)");

  const brands = [
    {
      name: "CNET",
      image:
        "https://i.ytimg.com/vi/YZ7ammy8C4A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDCNjPBJQvgKBkwPZfOJ_3ToV4Whw",
    },
    {
      name: "The Verge",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpyIsuFseqoTCjzBSKHyN7aWesLfE9L16GdkbwLMjmBd8fPftFQkJhNJFWpRCWzAv098E&usqp=CAU",
    },
    {
      name: "Time",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkh3h8ezL0BdBAG0aAFx3ZwsYzX3UBVubg135CMdLWxGjRHmVTqepwgSw9dV0YScFv8rs&usqp=CAU",
    },
  ];
  return (
    <div className="w-full px-3 sm:px-10 py-5">
      <h2 className="flex justify-center">As seen on</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="aspect-[4/2] shadow-lg rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-full object-contain"
              src={brand.image}
              alt={brand.name}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1 bg-white shadow-lg p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Free gift with your 1st order
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Join our newsletter to claim it
          </p>
          <div className="flex flex-col lg:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-2/3 px-3 py-2 border rounded-md h-[40px]"
            />
            <button className="w-full lg:w-1/3 h-[40px] bg-darkGreen text-white px-4 rounded-md hover:bg-green-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        <div className="sm:col-span-2 rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-full object-cover"
            src="https://kredivocorp.com/wp-content/uploads/2021/03/Samsung-financing-web-banner.jpg"
            alt="Samsung Financing"
          />
        </div>
      </div>
    </div>
  );
};

export default ProdBottom;
