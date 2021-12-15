/// <reference types="react-scripts" />

interface IWithLoading {
  loading: boolean;
}

interface Category {
  name: string;
}

interface IProduct {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: ProductAttributes[];
  prices: ProductPrices[];
}

interface ProductAttributes {
  id: string;
  name: string;
  type: string;
  items: ProductItems[];
}

interface ProductItems {
  displayValue: string;
  value: string;
  id: string;
}

interface ProductPrices {
  currency: ProductCurrency;
  amount: number;
}

interface ProductCurrency {
  label: string;
  symbol: string;
}

interface IProductInCart {
  product: IProduct;
  quantity: number;
  selectedAttributes?: ProductAttributesInCart[];
}

interface ProductAttributesInCart {
  id: string;
  name: string;
  type: string;
  items: ProductItems[];
  selected: ProductItems;
}
