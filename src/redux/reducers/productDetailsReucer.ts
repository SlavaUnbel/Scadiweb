import { createSymbiote } from 'redux-symbiote';

export interface ProductDetailsState {
  currentProduct: IProduct | null;
  currentImg: string;
  currentGalleryPage: number;
  galleryItemsPerPage: number;
  selectedAttributes: ProductAttributesInCart[];
}

const initialProductDetailsState: ProductDetailsState = {
  currentProduct: null,
  currentImg: "",
  currentGalleryPage: 1,
  galleryItemsPerPage: 4,
  selectedAttributes: [],
};

const symbiotes = {
  currentProduct: {
    set: (state: ProductDetailsState, currentProduct: IProduct | null) => ({
      ...state,
      currentProduct,
    }),
  },
  currentImg: {
    set: (state: ProductDetailsState, currentImg: string) => ({
      ...state,
      currentImg,
    }),
  },
  currentGalleryPage: {
    inc: (state: ProductDetailsState) => ({
      ...state,
      currentGalleryPage: state.currentGalleryPage + 1,
    }),
    dec: (state: ProductDetailsState) => ({
      ...state,
      currentGalleryPage: state.currentGalleryPage - 1,
    }),
  },
  selectedAttributes: {
    upsert: (state: ProductDetailsState, element: ProductAttributesInCart) => ({
      ...state,
      selectedAttributes: (() => {
        const newSelectedAttrs = [...state.selectedAttributes];

        const i = newSelectedAttrs.findIndex((el) => el.name === element.name);

        i > -1
          ? (newSelectedAttrs[i] = element)
          : newSelectedAttrs.push(element);

        return newSelectedAttrs;
      })(),
    }),
    clear: (state: ProductDetailsState) => ({
      ...state,
      selectedAttributes: [],
    }),
  },
};

export const {
  actions: productDetailsActions,
  reducer: productDetailsReducer,
} = createSymbiote(initialProductDetailsState, symbiotes);
