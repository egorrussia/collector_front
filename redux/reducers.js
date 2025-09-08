import { formsReducer } from '@/components/modals/redux/reducers';
import { collectorsReducer } from '@/components/collectors/redux/reducers';

import { combineReducers } from 'redux';

// COMBINED REDUCERS
const reducers = {
  forms: formsReducer,
  collectors: collectorsReducer
};

export default combineReducers(reducers);