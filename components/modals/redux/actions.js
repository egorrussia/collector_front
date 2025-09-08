import * as types from './types'

export const openModal = (type, params=null) => (dispatch) => {

    dispatch({
        type: types.SET_MODAL,
        payload: {type, params}
    })

}

export const closeModal = () => (dispatch) => {

    dispatch({
        type: types.SET_MODAL,
        payload: {type: null, params: null}
    })

}