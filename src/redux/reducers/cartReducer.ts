import { createSymbiote } from 'redux-symbiote';

export interface CartState {
  products: IProductInCart[];
  totalItems: number;
  totalPrice: number;
}

const initialCartState: CartState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

const symbiotes = {
  products: {
    set: (state: CartState, products: IProductInCart[]) => ({
      ...state,
      products,
    }),
    add: (state: CartState, newProduct: IProductInCart) => ({
      ...state,
      products: (() => [...state.products, newProduct])(),
    }),
    changeQuantity: (
      state: CartState,
      id: string,
      action: "add" | "remove"
    ) => ({
      ...state,
      products: (() => {
        const newCart = [...state.products];

        newCart.forEach((prod, idx) => {
          if (`${prod.product.id}-${idx}` === id) {
            action === "add" ? (prod.quantity += 1) : (prod.quantity -= 1);
          }
        });

        return newCart;
      })(),
    }),
    clear: (state: CartState) => ({
      ...state,
      products: [],
      totalItems: 0,
      totalPrice: 0,
    }),
  },
  totalItems: {
    set: (state: CartState, totalItems: number) => ({
      ...state,
      totalItems,
    }),
  },
  totalPrice: {
    set: (state: CartState, totalPrice: number) => ({
      ...state,
      totalPrice,
    }),
  },
};

export const { actions: cartActions, reducer: cartReducer } = createSymbiote(
  initialCartState,
  symbiotes
);
