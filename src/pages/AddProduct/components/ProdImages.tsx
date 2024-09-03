import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, ImageList, ImageListItem, Modal } from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";
import PopupImages from "./PopupImages";
import { error } from "console";

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

const ProdImages: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
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

  useEffect(() => {
    setImageList(formData.images);
  }, [formData.images]);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg">
          Product images{" "}
          <span className="text-blue-700 text-sm"> [limit 10 files] </span>
          <span className="text-red-600"> * </span>
        </p>
        <PopupImages
          formData={formData}
          updateField={updateField}
          errors={errors}
          startValidate={startValidate}
        />
      </div>
      <div className="border-2 h-[325px] border-solid border-gray-200 rounded-lg p-5 flex gap-3">
        <Box className="w-full flex items-center justify-start flex-wrap">
          {imageList.length < 10 && (
            <Box
              component="label"
              className={`cursor-pointer ${
                imageList.length === 0
                  ? "w-full h-full"
                  : "w-1/3 h-full px-3 py-10"
              } flex flex-col items-center justify-center rounded-lg bg-slate-100`}
            >
              <p className="font-medium my-1 text-[blue] text-sm">+ Upload</p>
              <p className="my-1 text-xs">(.png, .jped, .jpg)</p>
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
              imageList.length === 0
                ? "hidden"
                : imageList.length === 10
                ? "w-full "
                : "w-2/3 "
            } h-full px-3 py-10 overflow-y-scroll max-w[500px] max-h-[300px] flex items-start justify-start flex-wrap`}
          >
            {imageList.length > 0 && (
              <ImageList
                cols={imageList.length < 10 && imageList.length > 0 ? 2 : 3}
                gap={8}
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
                        style={{
                          borderRadius: "5px",
                          minWidth: "30%",
                        }}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            )}
          </Box>
        </Box>
      </div>
      {startValidate && errors.images && (
        <p className="my-2 text-[#f12727] text-sm">
          {startValidate && errors.images}
        </p>
      )}
    </div>
  );
};

export default ProdImages;
