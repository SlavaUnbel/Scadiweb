import { createSymbiote } from 'redux-symbiote';

export interface CategoryState {
  activeCategory: string;
}

const initialCategoryState: CategoryState = {
  activeCategory: "all",
};

const symbiotes = {
  activeCategory: {
    set: (state: CategoryState, activeCategory: string) => ({
      ...state,
      activeCategory,
    }),
    getAll: (state: CategoryState) => ({
      ...state,
      activeCategory: "all",
    }),
  },
};

export const { actions: categoryActions, reducer: categoryReducer } =
  createSymbiote(initialCategoryState, symbiotes);
