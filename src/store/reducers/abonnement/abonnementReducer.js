import { SET_ABONNEMENTS, SET_CURRENT_PAGE } from 'store/types/abonnement'

const initialState = {
  abonnements: [],
  currentPage: 1,
  pageSize: 10,
}

const abonnementsReducer = (state = initialState, { type, payload }) => {
  if (type === SET_ABONNEMENTS) {
    return {
      ...state,
      abonnements: [...payload],
    }
  }

  if (type === SET_CURRENT_PAGE) {
    return {
      ...state,
      currentPage: payload,
    }
  }

  return {
    ...state,
  }
}

export default abonnementsReducer
