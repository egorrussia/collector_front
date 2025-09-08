import { getCollectorsListRequest, createCollectorRequest } from "./requests"
import * as types from './types'

export const loadCollectors = (params)=>(dispatch) => {
    getCollectorsListRequest(params).then((data)=>{
        dispatch({
            type: types.LOAD_COLLECTORS,
            payload: data
        })
    })
}

export const createCollector = (params) => async (dispatch) => {
  try {
    const data = await createCollectorRequest(params)
   
    return data
    
  } catch (error) {
    console.log("ошибка при отправке запроса")
  }
}