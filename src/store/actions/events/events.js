import { SET_TYPES, SET_IS_LOADING, SET_ERROR } from 'store/types/events'

export const setTypes = payload => ({
  type: SET_TYPES,
  payload,
})

export const setIsLoading = payload => ({
  type: SET_IS_LOADING,
  payload,
})

export const setError = error => ({
  type: SET_ERROR,
  payload: error,
})
