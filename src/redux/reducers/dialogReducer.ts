import { createSymbiote } from 'redux-symbiote';

export interface DialogState {
  dialogOpened: boolean;
}

const initialDialogState: DialogState = {
  dialogOpened: false,
};

const symbiotes = {
  dialogOpened: {
    set: (state: DialogState, dialogOpened: boolean) => ({
      ...state,
      dialogOpened,
    }),
  },
};

export const { actions: dialogActions, reducer: dialogReducer } =
  createSymbiote(initialDialogState, symbiotes);
