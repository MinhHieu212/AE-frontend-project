import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, ImageList, ImageListItem, Modal } from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";
import PopupImages from "./PopupImages";

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

const ProdImages: React.FC<ProductFormProps> = ({ formData, updateField }) => {
  const [imageList, setImageList] = useState<ImageFile[]>([]);

  const uploadImageList = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);

      setImageList((prevList) => {
        const currentFileCount = prevList.length;
        const maxAllowedFiles = 10;

        const filesToAdd = newFiles
          .slice(0, maxAllowedFiles - currentFileCount)
          .map((file) => ({
            file,
            url: URL.createObjectURL(file),
          }));

        const updatedList = [...prevList, ...filesToAdd];

        return updatedList;
      });
    }
  };

  useEffect(() => {
    updateField("images", imageList);
  }, [imageList]);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg"> Product images </p>
        <PopupImages formData={formData} updateField={updateField} />
      </div>
      <div className="border-2 h-[325px] border-solid border-gray-200 rounded-lg p-5 flex gap-3">
        <Box className="w-full flex items-center justify-start gap-5">
          {imageList.length < 10 && (
            <Box
              component="label"
              className="h-full cursor-pointer w-1/3 flex flex-col items-center justify-center rounded-lg bg-slate-100"
            >
              <p className="font-medium my-1 text-[blue]"> Upload images </p>
              <p className="my-1">(.png, .jped, .jpg)</p>
              <VisuallyHiddenInput
                type="file"
                onChange={uploadImageList}
                accept="image/*"
                multiple
              />
            </Box>
          )}
          <Box
            className={`${
              imageList.length < 10 ? "w-2/3" : "w-full"
            } overflow-y-scroll h-full flex items-center justify-start gap-5`}
          >
            <ImageList
              cols={3}
              gap={8}
              className="w-full h-[300px] overflow-y-scroll rounded-lg"
              variant="masonry"
            >
              {imageList &&
                imageList.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      srcSet={`${item.url}`}
                      src={`${item.url}`}
                      alt={item?.file.name}
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
