/// <reference types="react-scripts" />

interface Category {
  name: string;
}

interface IProduct {
  name: string;
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
  currency: string;
  amount: number;
}
