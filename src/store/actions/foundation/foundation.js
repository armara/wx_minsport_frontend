import {
  SET_CONTRACTS,
  SET_LOADING,
  UPDATE_LIST,
  SET_ALLOWED_SPORTS,
  SET_ALLOWED_TYPES,
  SET_SPORT_FILTER,
  SET_TYPE_FILTER,
  SET_NAME_SEARCH,
  SET_MODAL,
  SET_CURRENT_CONTRACT,
  SET_CONTRACT_TYPES,
  SET_ORG_TYPES,
  SET_ORGANIZATIONS,
  SET_CONTRACT_ORGANIZATION,
  SET_ORGANIZATION_CONTRACTS,
} from 'store/types/foundation'

export const setOrganizationContracts = payload => ({
  type: SET_ORGANIZATION_CONTRACTS,
  payload,
})

export const setContractOrganization = payload => ({
  type: SET_CONTRACT_ORGANIZATION,
  payload,
})

export const setOrganizations = payload => ({
  type: SET_ORGANIZATIONS,
  payload,
})

export const updateFoundations = payload => ({
  type: UPDATE_LIST,
  payload,
})

export const setContracts = payload => ({
  type: SET_CONTRACTS,
  payload,
})

export const setOrgTypes = payload => ({
  type: SET_ORG_TYPES,
  payload,
})

export const setContractTypes = payload => ({
  type: SET_CONTRACT_TYPES,
  payload,
})

export const setAllowedSports = payload => ({
  type: SET_ALLOWED_SPORTS,
  payload,
})

export const setAllowedTypes = payload => ({
  type: SET_ALLOWED_TYPES,
  payload,
})

export const setLoading = payload => ({
  type: SET_LOADING,
  payload,
})

export const setSportFilter = payload => ({
  type: SET_SPORT_FILTER,
  payload,
})

export const setTypeFilter = payload => ({
  type: SET_TYPE_FILTER,
  payload,
})

export const setNameSearch = payload => ({
  type: SET_NAME_SEARCH,
  payload,
})

export const setCurrentContract = payload => ({
  type: SET_CURRENT_CONTRACT,
  payload,
})

export const setModal = payload => ({
  type: SET_MODAL,
  payload,
})
