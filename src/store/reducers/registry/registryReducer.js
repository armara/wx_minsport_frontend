import {
  SET_REGISTRY_FULL_PERSONS,
  SET_REGISTRY_LOADING,
  SET_REGISTRY_ERROR,
  SET_RANKS_ALL,
  SET_FEDERATIONS_ALL,
  SET_FULL_SPORTS,
  SET_FULL_DISCIPLINES,
  SET_PERSONS_MODE,
  SET_SINGLE_PERSON,
  SET_CURRENT_PAGE,
  SET_SPORT_FILTER,
  SET_RANK_FILTER,
  SET_GROUP_FILTER,
  SET_SEARCH_VALUE,
  SET_FACILITY_SPORTS,
  SET_FACILITY_DISCIPLINES,
} from 'store/types/registry'

export const initialSportPair = { id: 1, item: 'Все виды спорта' }
export const initialRankPairs = [{ id: 1, item: 'Вcе звания' }]
export const initialGroupPair = { id: 1, item: 'Команда' }

const initialState = {
  isLoading: false,
  error: null,
  fullPersons: [],
  fullSports: [],
  fullDisciplines: [],
  facilitySports: [],
  facilityDisciplines: [],
  ranksAll: [],
  federationsAll: [],
  personsMode: 'sportsmen',
  singlePerson: {},
  currentPage: 0,
  pageSize: 10,

  sportFilter: initialSportPair,
  rankFilter: initialRankPairs[0],
  groupFilter: initialGroupPair,
  searchValue: '',
}

const registryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FACILITY_SPORTS:
      return {
        ...state,
        facilitySports: payload,
      }
    case SET_FACILITY_DISCIPLINES:
      return {
        ...state,
        facilityDisciplines: payload,
      }
    case SET_REGISTRY_ERROR:
      return {
        ...state,
        error: payload,
      }
    case SET_REGISTRY_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_REGISTRY_FULL_PERSONS:
      return {
        ...state,
        fullPersons: payload,
      }
    case SET_FULL_SPORTS:
      return {
        ...state,
        fullSports: payload,
      }
    case SET_FULL_DISCIPLINES:
      return {
        ...state,
        fullDisciplines: payload,
      }
    case SET_RANKS_ALL:
      return {
        ...state,
        ranksAll: payload,
      }
    case SET_FEDERATIONS_ALL:
      return {
        ...state,
        federationsAll: payload,
      }
    case SET_PERSONS_MODE:
      return {
        ...state,
        personsMode: payload,
      }
    case SET_SINGLE_PERSON:
      return {
        ...state,
        singlePerson: payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      }
    case SET_SPORT_FILTER:
      return {
        ...state,
        sportFilter: payload,
      }
    case SET_RANK_FILTER:
      return {
        ...state,
        rankFilter: payload,
      }
    case SET_GROUP_FILTER:
      return {
        ...state,
        groupFilter: payload,
      }
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload,
      }

    default:
      return state
  }
}

export default registryReducer
