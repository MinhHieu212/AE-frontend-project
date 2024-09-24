import { useAppSelector } from "../../../../store/store";

export function getaAddProductPayload() {
  const product = useAppSelector((state) => state.product);
  const variants = useAppSelector((state) => state.variants.variants);
  const variants_table = useAppSelector(
    (state) => state.variants.combineVariantsTable
  );

  const variantsPayload = variants_table.map((variant) => {
    const knownKeys: string[] = [
      "quantity",
      "price",
      "salePrice",
      "sku",
      "mrspPrice",
    ];

    const variantOptions = Object.entries(variant)
      .filter(([key]) => !knownKeys.includes(key))
      .reduce((acc: Record<string, any>, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    return {
      quantityAvailable: variant.quantity,
      price: variant.price,
      salePrice: variant.salePrice,
      sku: variant.sku,
      mrsp: variant.mrspPrice,
      imageURLs: [],
      variantOptions,
    };
  });

  const optionsPayload = variants.map((item, indez) => {
    return {
      [item.type]: item.values,
    };
  }, {});

  let payload = {
    name: product.name,
    imageURL: product.images.map((image) => image.url),
    primaryImageURL: product?.primaryImage?.url,
    description: product.description,
    rating: 0,
    noOfReviews: 0,
    brandName: product.brand,
    sellingTypes: product.sellingType,
    categories: product.collections,
    dimensions: {
      weight: product.packages_weight,
      length: product.packages_size.length,
      width: product.packages_size.width,
      height: product.packages_size.height,
    },
    hasVariants: product.haveVariants,
    variants: variantsPayload,
    options: optionsPayload,
  };

  return payload;
}
