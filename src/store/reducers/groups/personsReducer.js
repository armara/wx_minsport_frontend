import {
  SET_MODAL,
  SET_LOADING,
  SET_PERSONS,
  SET_POSITION_FILTER,
  SET_CURRENT_PAGE,
  SET_SEARCH_VALUE,
  SET_CURRENT_PERSON,
} from 'store/types/groups/persons'

export const initialPositionFilter = { id: 1, item: 'Все должности' }

const initialState = {
  isLoading: false,
  error: null,
  persons: [],
  currentPerson: {},
  positionFilter: initialPositionFilter,
  searchValue: '',
  pageSize: 10,
  currentPage: 1,
}

const personsReducer = (state = initialState, { type, payload }) => {
  if (type === SET_SEARCH_VALUE) {
    return {
      ...state,
      searchValue: payload,
    }
  }

  if (type === SET_POSITION_FILTER) {
    return {
      ...state,
      positionFilter: payload,
    }
  }

  if (type === SET_CURRENT_PAGE) {
    return {
      ...state,
      currentPage: payload,
    }
  }

  if (type === SET_CURRENT_PERSON) {
    return {
      ...state,
      currentPerson: { ...payload },
    }
  }

  if (type === SET_MODAL) {
    return {
      ...state,
      isModalOpen: payload,
    }
  }

  if (type === SET_LOADING) {
    return {
      ...state,
      isLoading: payload,
    }
  }

  if (type === SET_PERSONS) {
    return {
      ...state,
      persons: payload,
    }
  }

  return {
    ...state,
  }
}

export default personsReducer
