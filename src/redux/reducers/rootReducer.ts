import { combineReducers, Store } from 'redux';

import { categoryReducer, CategoryState } from './categoryReducer';
import { currencyReducer, CurrencyState } from './currencyReducer';
import { dialogReducer, DialogState } from './dialogReducer';
import { productsReducer, ProductsState } from './productsReducer';

export type IStore = Store<IState>;

export type IState = {
  category: CategoryState;
  currency: CurrencyState;
  products: ProductsState;
  dialog: DialogState;
};

export default combineReducers({
  category: categoryReducer,
  currency: currencyReducer,
  products: productsReducer,
  dialog: dialogReducer,
});
