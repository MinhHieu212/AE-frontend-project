export interface CategoryDataProps {
  name: string | null;
  index: number | null;
}

export interface Category {
  level_1: CategoryDataProps;
  level_2: CategoryDataProps;
}

export interface Inventory {
  quantity: number | null;
  sku: string;
}

export interface PackageSize {
  length: number | null;
  width: number | null;
  height: number | null;
}

export interface Pricing {
  msrp: number | null;
  salePrice: number | null;
  price: number | null;
}

export interface ImageFile {
  file: File;
  url: string;
}

export interface FormData {
  name: string;
  description: string;
  sellingType: string;
  category: Category;
  inventory: Inventory;
  packages_weight: number | null;
  packages_size: PackageSize;
  pricing: Pricing;
  images: ImageFile[];
  primaryImage: ImageFile | null;
}

export interface product_types {
  formData: FormData;
  updateField: (field: string, value: any) => void;
  errors: any;
  startValidate: boolean;
}

export interface Popupproduct_types {
  formData: FormData;
  updateField: (field: string, value: any) => void;
  errors: any;
  startValidate: boolean;
  setImageList: (values: any) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  imageInputRef: any;
}

interface CategoryProps {
  id: number;
  name: string;
  parentID: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  subCategory: CategoryProps[];
  noOfViews: number;
  ListSold: number;
}

interface Dimensions {
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
}

export interface ProductProps {
  id: number;
  name: string;
  imageURL: string[] | null;
  primaryImageURL: string | null;
  description: string;
  msrp: number;
  salePrice: number;
  price: number;
  rating: number;
  viewCount: number;
  quantity: number;
  quantitySold: number;
  remainingQuantity: number;
  brandName: string | null;
  sellingTypes: string;
  createdAt: string;
  updatedAt: string | null;
  categories: CategoryProps[];
  dimensions: Dimensions | null;
  sku: string;
}
