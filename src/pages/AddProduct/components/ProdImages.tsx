import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, ImageList, ImageListItem } from "@mui/material";

interface ImageFile {
  file: File;
  url: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProdImages = () => {
  const [imageList, setImageList] = useState<ImageFile[]>([]);

  const uploadImageList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageList: ImageFile[] = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setImageList((prevList) => [...prevList, ...newImageList]);

      console.log("New image list:", newImageList);
    }
  };

  return (
    <div className="w-full rounded-lg mb-3 p-3">
      <p className="font-medium text-lg"> Product images</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-[250px] flex gap-3">
        <Box className="w-full flex items-center justify-start gap-5">
          <Box
            component="label"
            className="h-full cursor-pointer w-1/3 flex flex-col items-center justify-center rounded-lg bg-slate-100"
          >
            <p className="font-medium my-1 text-[blue]">Upload images</p>
            <p className="my-1">(.png, .jped, .jpg)</p>
            <VisuallyHiddenInput
              type="file"
              onChange={uploadImageList}
              accept="image/*"
              multiple
            />
          </Box>
          <Box className="h-[325px] w-2/3 overflow-y-scroll flex items-center justify-start gap-5">
            <ImageList
              cols={3}
              gap={8}
              className="w-full h-full rounded-lg"
              variant="masonry"
            >
              {imageList.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${item.url}`}
                    src={`${item.url}`}
                    alt={item.file.name}
                    loading="lazy"
                    className="w-[400] h-[400] object-cover"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ProdImages;
