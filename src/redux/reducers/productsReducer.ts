import { createSymbiote } from 'redux-symbiote';

export interface ProductsState {
  products: IProduct[];
}

const initialProductsState: ProductsState = {
  products: [],
};

const symbiotes = {
  products: {
    set: (state: ProductsState, products: IProduct[]) => ({
      ...state,
      products,
    }),
  },
};

export const { actions: productsActions, reducer: productsReducer } =
  createSymbiote(initialProductsState, symbiotes);
