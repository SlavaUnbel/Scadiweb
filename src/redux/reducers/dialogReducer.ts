import { createSymbiote } from 'redux-symbiote';

export interface DialogState {
  dialogOpened: boolean;
  attributesModalOpened: boolean;
  chosenProduct: IProduct | null;
  paymentModalOpened: boolean;
  processingPayment: boolean;
}

const initialDialogState: DialogState = {
  dialogOpened: false,
  attributesModalOpened: false,
  chosenProduct: null,
  paymentModalOpened: false,
  processingPayment: true,
};

const symbiotes = {
  opened: {
    setDialog: (state: DialogState, dialogOpened: boolean) => ({
      ...state,
      dialogOpened,
    }),
    setAttributesModal: (
      state: DialogState,
      attributesModalOpened: boolean
    ) => ({
      ...state,
      attributesModalOpened,
    }),
    setPaymentModal: (state: DialogState, paymentModalOpened: boolean) => ({
      ...state,
      paymentModalOpened,
    }),
  },
  product: {
    choose: (state: DialogState, chosenProduct: IProduct | null) => ({
      ...state,
      chosenProduct,
    }),
  },
  payment: {
    changeStatus: (state: DialogState, processingPayment: boolean) => ({
      ...state,
      processingPayment,
    }),
  },
};

export const { actions: dialogActions, reducer: dialogReducer } =
  createSymbiote(initialDialogState, symbiotes);
