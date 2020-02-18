import {
  SET_MODAL,
  SET_GROUPS,
  SET_LOADING,
  SET_POSITIONS,
  SET_CURRENT_GROUP,
  SET_SEARCH_VALUE,
  SET_DISCIPLINE_FILTER,
  SET_SPORT_FILTER,
  SET_AGES_FILTER,
  SET_CURRENT_PAGE,
} from 'store/types/groups/groups'

export const initialDisciplineFilter = {
  id: 1,
  item: 'Все виды дисциплин',
  type: 'all',
}
export const initialSportFilter = {
  id: 1,
  item: 'Все виды спорта',
  type: 'all',
  disciplines: [],
}
export const initialAgesFilter = {
  id: 1,
  item: 'Все возраста',
  type: 'all',
}

const initialState = {
  isLoading: false,
  error: null,
  groups: [],
  positions: [],
  currentGroup: {},
  isModalOpen: false,

  disciplineFilter: initialDisciplineFilter,
  sportFilter: initialSportFilter,
  agesFilter: initialAgesFilter,
  searchValue: '',
  pageSize: 10,
  currentPage: 1,
}

const groupReducer = (state = initialState, { type, payload }) => {
  if (type === SET_GROUPS) {
    return {
      ...state,
      groups: [...payload],
    }
  }

  if (type === SET_SEARCH_VALUE) {
    return {
      ...state,
      searchValue: payload,
    }
  }

  if (type === SET_DISCIPLINE_FILTER) {
    return {
      ...state,
      disciplineFilter: payload,
    }
  }

  if (type === SET_SPORT_FILTER) {
    return {
      ...state,
      sportFilter: payload,
    }
  }

  if (type === SET_AGES_FILTER) {
    return {
      ...state,
      agesFilter: payload,
    }
  }

  if (type === SET_CURRENT_PAGE) {
    return {
      ...state,
      currentPage: payload,
    }
  }

  if (type === SET_CURRENT_GROUP) {
    return {
      ...state,
      currentGroup: { ...payload },
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

  if (type === SET_POSITIONS) {
    return {
      ...state,
      positions: payload,
    }
  }

  return {
    ...state,
  }
}

export default groupReducer
