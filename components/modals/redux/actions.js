import * as types from './types'

export const openModal = (type, params=null, callback=null) => (dispatch) => {

    dispatch({
        type: types.SET_MODAL,
        payload: {type, params, callback}
    })

}

export const closeModal = () => (dispatch) => {

    dispatch({
        type: types.SET_MODAL,
        payload: {type: null, params: null}
    })

}