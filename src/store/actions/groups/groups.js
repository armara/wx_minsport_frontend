import {
  SET_GROUPS,
  SET_LOADING,
  SET_POSITIONS,
  SET_CURRENT_GROUP,
  SET_MODAL,
  SET_SEARCH_VALUE,
  SET_DISCIPLINE_FILTER,
  SET_SPORT_FILTER,
  SET_CURRENT_PAGE,
} from 'store/types/groups/groups'

export const setIsLoading = payload => ({
  type: SET_LOADING,
  payload,
})

export const setGroups = payload => {
  return {
    type: SET_GROUPS,
    payload,
  }
}

export const setPositions = payload => ({
  type: SET_POSITIONS,
  payload,
})

export const setCurrentGroup = payload => ({
  type: SET_CURRENT_GROUP,
  payload,
})

export const setModal = payload => ({
  type: SET_MODAL,
  payload,
})

export const setSearchValue = payload => ({
  type: SET_SEARCH_VALUE,
  payload,
})

export const setDisciplineFilter = payload => ({
  type: SET_DISCIPLINE_FILTER,
  payload,
})

export const setSportFilter = payload => ({
  type: SET_SPORT_FILTER,
  payload,
})

export const setCurrentPage = payload => ({
  type: SET_CURRENT_PAGE,
  payload,
})
