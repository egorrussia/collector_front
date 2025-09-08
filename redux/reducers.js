import { formsReducer } from '@/components/modals/redux/reducers';

import { combineReducers } from 'redux';

// COMBINED REDUCERS
const reducers = {
  forms: formsReducer
};

export default combineReducers(reducers);