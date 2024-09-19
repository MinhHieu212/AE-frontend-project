import { useEffect, useRef, useState } from "react";
import { toast } from "../../../../utils/Toastify";
import { createProduct, uploadImageProduct } from "../../../../api/ProductApi";
import { ImageFile } from "../../../../types/product_types";
import { useNavigate } from "react-router-dom";

export const useProductForm = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellingType: "In-store selling only",
    category: {
      level_1: { name: null, index: null },
      level_2: { name: null, index: null },
    },
    inventory: { quantity: null, sku: "" },
    packages_weight: null,
    packages_size: { length: null, width: null, height: null },
    pricing: { msrp: null, salePrice: null, price: null },
    images: [],
    primaryImage: null,
  });
  const initialFormData = useRef(formData);
  const isFormSubmitted = useRef<boolean>(false);

  const [errors, setErrors] = useState({});

  const updateField = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const resetFormData = () =>
    setFormData({
      name: "",
      description: "",
      sellingType: "In-store selling only",
      category: {
        level_1: { name: null, index: null },
        level_2: { name: null, index: null },
      },
      packages_weight: null,
      inventory: { quantity: null, sku: "" },
      packages_size: { length: null, width: null, height: null },
      pricing: { msrp: null, salePrice: null, price: null },
      images: [],
      primaryImage: null,
    });

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 5 || formData.name.length > 120) {
      newErrors.name = "Name must be between 5 and 120 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (
      formData.description.length < 200 ||
      formData.description.length > 1000
    ) {
      newErrors.description =
        "Description must be between 200 and 1000 characters.";
    }

    if (!formData.category.level_1) {
      newErrors.category = "Category is required.";
    }

    if (
      formData.inventory.quantity === null ||
      formData.inventory.quantity < 0
    ) {
      newErrors.inventory =
        "Quantity is required and must be a positive integer.";
    } else if (!Number.isInteger(formData.inventory.quantity)) {
      newErrors.inventory = "Quantity must be a whole number.";
    }
    if (formData.images.length === 0) {
      newErrors.images = "Image is required.";
    } else if (formData.images.length > 10) {
      newErrors.images = "You can upload up to 10 images.";
    }
    if (
      formData.images.length > 0 &&
      formData.images.some((image: any) => image.size > 10 * 1024 * 1024)
    ) {
      newErrors.images = "Each image must be smaller than 10MB.";
    }

    const validatePackageDimension = (dimension: any, name: string) => {
      if (
        dimension !== null &&
        (!Number.isFinite(dimension) || dimension < 0)
      ) {
        newErrors[name] = "Package dimensions must be positive numbers.";
      }
    };
    validatePackageDimension(formData.packages_weight, "packages_weight");
    validatePackageDimension(
      formData.packages_size.length,
      "packages_size.length"
    );
    validatePackageDimension(
      formData.packages_size.width,
      "packages_size.width"
    );
    validatePackageDimension(
      formData.packages_size.height,
      "packages_size.height"
    );

    const { msrp, salePrice, price } = formData.pricing;
    if (price === null) {
      newErrors.pricing = "Price is required.";
    }
    if (msrp === null) {
      newErrors.pricing = "MSRP price is required.";
    }
    if (price !== null && (!Number.isFinite(price) || price < 0)) {
      newErrors.pricing = "Price must be a positive number.";
    }
    if (salePrice !== null && (!Number.isFinite(salePrice) || salePrice < 0)) {
      newErrors.pricing = "Sale price must be a positive number.";
    }
    if (msrp !== null && (!Number.isFinite(msrp) || msrp < 0)) {
      newErrors.pricing = "MSRP must be a positive number.";
    }
    if (price !== null && salePrice !== null && price < salePrice) {
      newErrors.pricing = "Sale price must be less than Price";
    }
    if (price !== null && msrp !== null && price < msrp) {
      newErrors.pricing = "MSRP price must be less than Price";
    }
    if (salePrice !== null && msrp !== null && salePrice < msrp) {
      newErrors.pricing = "MSRP price must be less than Sale price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (validateForm()) {
      const convertedData = {
        name: formData.name,
        imageURL: null,
        primaryImageURL: null,
        description: formData.description,
        msrp: formData.pricing.msrp,
        salePrice: formData.pricing.salePrice,
        price: formData.pricing.price,
        quantity: formData.inventory.quantity,
        sellingTypes: formData.sellingType,
        categories: [
          formData.category.level_1.index,
          formData.category.level_2.index !== null
            ? formData.category.level_2.index
            : null,
        ].filter((category) => category !== null),
        dimensions: {
          weight: formData.packages_weight,
          length: formData.packages_size.length,
          width: formData.packages_size.width,
          height: formData.packages_size.height,
        },
        sku: formData.inventory.sku,
      };
      console.log("Form submitted:", JSON.stringify(convertedData, null, 2));
      try {
        setLoading(true);
        const response_data = await createProduct(convertedData);
        if (response_data.id) {
          toast.success("New product added successfully");

          isFormSubmitted.current = true;

          let tempImages = null;
          if (formData.primaryImage) {
            tempImages = formData.images.filter(
              (item) => item !== formData.primaryImage
            );
            tempImages = [formData.primaryImage, ...tempImages];
          } else {
            tempImages = formData.images;
          }

          const payloadFormData = new FormData();
          tempImages.forEach((images: ImageFile) => {
            payloadFormData.append("file", images.file);
            URL.revokeObjectURL(images.url);
          });

          const s3_response_data = await uploadImageProduct(
            response_data.id,
            payloadFormData
          );

          if (s3_response_data.id) {
            toast.success("Image of new product save successfully");

            setTimeout(() => navigator("/products"), 1000);
          }
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (
        !isFormSubmitted.current &&
        JSON.stringify(formData) !== JSON.stringify(initialFormData.current)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData]);

  const checkUnSaveData = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData.current);
  };

  return {
    formData,
    updateField,
    submitForm,
    validateForm,
    resetFormData,
    checkUnSaveData,
    errors,
    loading,
  };
};
