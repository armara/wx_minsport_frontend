import {
  SET_REGISTRY_FULL_PERSONS,
  SET_REGISTRY_LOADING,
  SET_RANKS_ALL,
  SET_FEDERATIONS_ALL,
  SET_FULL_SPORTS,
  SET_PERSONS_MODE,
  SET_SINGLE_PERSON,
  SET_CURRENT_PAGE,
  SET_SPORT_FILTER,
  SET_RANK_FILTER,
  SET_GROUP_FILTER,
  SET_SEARCH_VALUE,
  SET_FULL_DISCIPLINES,
  SET_FACILITY_SPORTS,
  SET_FACILITY_DISCIPLINES,
} from 'store/types/registry'

const setFacilitySports = payload => ({
  type: SET_FACILITY_SPORTS,
  payload,
})

const setFacilityDisciplines = payload => ({
  type: SET_FACILITY_DISCIPLINES,
  payload,
})

const setSportFilter = payload => ({
  type: SET_SPORT_FILTER,
  payload,
})

const setRankFilter = payload => ({
  type: SET_RANK_FILTER,
  payload,
})

const setGroupFilter = payload => ({
  type: SET_GROUP_FILTER,
  payload,
})

const setSearchValue = payload => ({
  type: SET_SEARCH_VALUE,
  payload,
})

const setFullPersons = payload => ({
  type: SET_REGISTRY_FULL_PERSONS,
  payload,
})

const setFullSports = payload => ({
  type: SET_FULL_SPORTS,
  payload,
})

const setFullDisciplines = payload => ({
  type: SET_FULL_DISCIPLINES,
  payload,
})

const setSinglePerson = payload => ({
  type: SET_SINGLE_PERSON,
  payload,
})

const setPersonsMode = payload => ({
  type: SET_PERSONS_MODE,
  payload,
})

const setCurrentPage = payload => ({
  type: SET_CURRENT_PAGE,
  payload,
})

const setRegistryLoading = payload => ({
  type: SET_REGISTRY_LOADING,
  payload,
})

const setRanksAll = payload => ({
  type: SET_RANKS_ALL,
  payload,
})

const setFederationsAll = payload => ({
  type: SET_FEDERATIONS_ALL,
  payload,
})

export {
  setFacilitySports,
  setFacilityDisciplines,
  setFullPersons,
  setFullSports,
  setFullDisciplines,
  setSinglePerson,
  setPersonsMode,
  setCurrentPage,
  setRegistryLoading,
  setSportFilter,
  setRankFilter,
  setGroupFilter,
  setSearchValue,
  setRanksAll,
  setFederationsAll,
}
