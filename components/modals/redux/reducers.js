import * as types from './types';

const initialState = {
  modal: {type: null, params: null}
};


export const formsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.SET_MODAL:
      return {
        ...state,
        modal: payload
      };
        default:
      return state; // если не нашёл никаких action
  }
};
