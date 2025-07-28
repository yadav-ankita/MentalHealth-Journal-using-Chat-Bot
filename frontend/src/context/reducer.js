import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_USER,
  LOGOUT_USER,
  SET_LOADING,
} from './action'

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true}
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
    }
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
    }
  }
  throw new Error(`no such action : ${action}`)
}

export default reducer
