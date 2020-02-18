import { SET_TYPES, SET_ERROR, SET_IS_LOADING } from 'store/types/events'

const initialState = {
  isLoading: false,
  error: false,
  types: [],
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {
        ...state,
        types: [...action.payload],
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

export default eventsReducer
