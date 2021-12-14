import { createSymbiote } from 'redux-symbiote';

export interface DialogState {
  dialogOpened: boolean;
  modalOpened: boolean;
  chosenProduct: IProduct | null;
}

const initialDialogState: DialogState = {
  dialogOpened: false,
  modalOpened: false,
  chosenProduct: null,
};

const symbiotes = {
  opened: {
    setDialog: (state: DialogState, dialogOpened: boolean) => ({
      ...state,
      dialogOpened,
    }),
    setModal: (state: DialogState, modalOpened: boolean) => ({
      ...state,
      modalOpened,
    }),
  },
  product: {
    choose: (state: DialogState, chosenProduct: IProduct | null) => ({
      ...state,
      chosenProduct,
    }),
  },
};

export const { actions: dialogActions, reducer: dialogReducer } =
  createSymbiote(initialDialogState, symbiotes);
