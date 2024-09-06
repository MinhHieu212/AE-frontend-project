import { Button } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone, DropzoneState } from "react-dropzone";
import { ProductFormProps } from "../types/ProductFormProps";
import NewPopupImages from "./NewPopupImages";

const NewProdimages: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const maxFiles = 10;
    const totalFiles = formData.images.length + acceptedFiles.length;
    if (totalFiles > maxFiles) {
      const filesToAdd = maxFiles - formData.images.length;
      acceptedFiles = acceptedFiles.slice(0, filesToAdd);
    }
    const newFiles = acceptedFiles.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));
    const prev_images = formData.images;
    updateField("images", [...prev_images, ...newFiles]);
    updateField("primaryImage", prev_images[0]);
  };

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      onDrop,
    });

  const handleRemoveImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    updateField("images", updatedImages);
  };

  const handleReplaceImage = (index: number, file: File) => {
    const updatedImages = formData.images.map((img, i) =>
      i === index ? { file: file, url: URL.createObjectURL(file) } : img
    );
    updateField("images", updatedImages);
  };

  const handleReplaceClick = (index: number) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      if (event.target && (event.target as HTMLInputElement).files) {
        const file = (event.target as HTMLInputElement).files![0];
        handleReplaceImage(index, file);
      }
    };
    inputElement.click();
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg">
          Product images <span className="text-red-600"> * </span>
          <span className="text-blue-700 text-sm">
            [{formData.images.length} / 10 files]
          </span>
        </p>
        <NewPopupImages
          formData={formData}
          updateField={updateField}
          errors={errors}
          startValidate={startValidate}
          openModal={openModal}
          setImageList={onDrop}
          setOpenModal={setOpenModal}
          imageInputRef={imageInputRef}
        />
      </div>
      <div className="flex w-full items-center p-2 px-5 rounded-lg border-2 h-[325px] border-solid border-gray-200 gap-3">
        <div
          {...getRootProps()}
          className={`${
            formData.images.length === 0
              ? "w-full"
              : formData.images.length === 10
              ? "hidden"
              : "w-1/3"
          } ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-slate-100"
          } h-[calc(100%-14px)] my-2 flex items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
            formData.images.length >= 10 ? "hidden" : ""
          }`}
        >
          <input {...getInputProps()} ref={imageInputRef} />
          <p className="text-sm">Upload or Drag Image</p>
        </div>
        <div
          className={`${
            formData.images.length >= 10
              ? "w-full"
              : formData.images.length > 0
              ? "w-2/3"
              : "hidden"
          } h-full flex items-center justify-center`}
        >
          <div
            className={`${
              formData.images.length === 1 ? "w-full" : "w-1/2"
            } h-[calc(100%-14px)] flex items-center justify-center px-2 relative group`}
          >
            <img
              src={formData.images[0]?.url}
              alt={`Image file ${formData.images[0]?.file.name}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className={`w-[calc(100%-14px)] mx-2 h-full flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col gap-5`}
            >
              <Button
                className="text-white"
                variant="contained"
                onClick={() => handleReplaceClick(0)}
              >
                Replace
              </Button>
              <Button
                className="text-white"
                variant="contained"
                onClick={() => handleRemoveImage(0)}
              >
                Remove
              </Button>
            </div>
          </div>

          <div
            className={`${
              formData.images.length === 1 ? "hidden" : "w-1/2"
            } h-[calc(100%-14px)] flex flex-col items-evenly justify-start py-2 gap-2`}
          >
            {formData.images.slice(1, 3).map((item, index) => {
              return (
                <div className="w-full h-1/2 relative" key={index + 1}>
                  <img
                    src={item.url}
                    alt={`Image file ${item.file.name}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    className={`w-full h-full flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col gap-5`}
                  >
                    <Button
                      className="text-white"
                      variant="contained"
                      onClick={() => handleReplaceClick(index + 1)}
                    >
                      Replace
                    </Button>
                    <Button
                      className="text-white"
                      variant="contained"
                      onClick={() => handleRemoveImage(index + 1)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProdimages;
