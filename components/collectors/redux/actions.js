import { getCollectorsListRequest, createCollectorRequest, deleteCollectorRequest } from "./requests"
import * as types from './types'


export const loadCollectors = (params) => async (dispatch) => {
  try {
    const data = await getCollectorsListRequest(params)
    dispatch({ type: types.LOAD_COLLECTORS, payload: data });
  } catch (error) {
    //dispatch({ type: 'LOAD_ERROR', payload: error.message });
  }
};

export const createCollector = (params) => async (dispatch) => {
  try {
    const data = await createCollectorRequest(params)
   
    return data
    
  } catch (error) {
    console.log("ошибка при отправке запроса")
  }
}

export const deleteCollector = (params) => async (dispatch) => {
  try {
    await deleteCollectorRequest(params)
  } catch (error) {
    console.log("ошибка при отправке запроса")
  }
}