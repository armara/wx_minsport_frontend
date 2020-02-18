import {
  SET_MODAL,
  SET_LOADING,
  SET_PERSONS,
  SET_CURRENT_PERSON,
} from 'store/types/groups/persons'

export const setIsLoading = payload => ({
  type: SET_LOADING,
  payload,
})

export const setPersons = payload => ({
  type: SET_PERSONS,
  payload,
})

export const setCurrentPerson = payload => ({
  type: SET_CURRENT_PERSON,
  payload,
})

export const setModalState = payload => ({
  type: SET_MODAL,
  payload,
})
