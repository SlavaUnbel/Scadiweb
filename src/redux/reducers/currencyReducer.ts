import { createSymbiote } from 'redux-symbiote';

export interface CurrencyState {
  chosenCurrency: string;
}

const initialCurrencyState: CurrencyState = {
  chosenCurrency: "USD",
};

const symbiotes = {
  chosenCurrency: {
    set: (state: CurrencyState, chosenCurrency: string) => ({
      ...state,
      chosenCurrency,
    }),
  },
};

export const { actions: currencyActions, reducer: currencyReducer } =
  createSymbiote(initialCurrencyState, symbiotes);
