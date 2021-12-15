import { createSymbiote } from 'redux-symbiote';

export interface CurrencyState {
  chosenCurrency: ProductCurrency;
}

const initialCurrencyState: CurrencyState = {
  chosenCurrency: { label: "USD", symbol: "$" },
};

const symbiotes = {
  chosenCurrency: {
    set: (state: CurrencyState, chosenCurrency: ProductCurrency) => ({
      ...state,
      chosenCurrency,
    }),
  },
};

export const { actions: currencyActions, reducer: currencyReducer } =
  createSymbiote(initialCurrencyState, symbiotes);
