import * as types from './types';

const initialState = {
  collectors: [],
  pagination: {}
};


export const collectorsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.LOAD_COLLECTORS:
      return {
        ...state,
        collectors: payload.result.items,
        pagination: payload.result.pagination
      };
    case types.CREATE_COLLECTOR:
      return {
        ...state,
        collectors: [...state.collectors, payload]
      };
    case types.LOAD_COLLECTOR_DETAIL:
      return {
        ...state,
        collectors: [...state.collectors, payload]
      };
    default:
      return state;
  }
};
