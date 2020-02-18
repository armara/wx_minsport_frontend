import {
  SET_CONTRACTS,
  SET_ALLOWED_SPORTS,
  SET_ALLOWED_TYPES,
  SET_LOADING,
  UPDATE_LIST,
  SET_CONTRACT_ORGANIZATION,
  SET_SPORT_FILTER,
  SET_TYPE_FILTER,
  SET_NAME_SEARCH,
  SET_CURRENT_CONTRACT,
  SET_MODAL,
  SET_ORG_TYPES,
  SET_CONTRACT_TYPES,
  SET_ORGANIZATIONS,
  SET_ORGANIZATION_CONTRACTS,
} from 'store/types/foundation'

const initialState = {
  all: [],
  contracts: [],
  organizations: [],
  orgTypes: [],
  contractTypes: [],
  organizationContracts: [],
  currentContract: {
    organizationName: '',
    zoneTitle: '',
    zones: [],
    files: [
      {
        key: 0,
        name: '',
      },
    ],
    id: '',
  },
  contractOrganization: {},
  isModalOpen: false,
  searchValue: '',
  sportFilter: { id: 1, item: 'Все виды спорта' },
  allowedSports: [{ id: 1, item: 'Все виды спорта' }],
  typeFilter: { id: 1, item: 'Все типы организаций' },
  allowedTypes: [{ id: 1, item: 'Все типы организаций' }],
  loading: false,
  isError: false,
  pageSize: 10,
  currentPage: 0,
  pages: 1,
  total: 0,
}

const foundationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORGANIZATION_CONTRACTS:
      return {
        ...state,
        organizationContracts: action.payload,
      }
    case SET_CONTRACT_ORGANIZATION:
      return {
        ...state,
        contractOrganization: action.payload,
      }
    case SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload,
      }
    case UPDATE_LIST:
      return {
        ...state,
        contracts: action.payload.contracts,
        loading: false,
        currentPage: action.payload.currentPage,
        pages: action.payload.pages,
        total: action.payload.total,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_CONTRACTS:
      return {
        ...state,
        all: action.payload,
        total: action.payload.length,
        organizationContracts: action.payload,
        contracts: [],
      }
    case SET_ALLOWED_SPORTS:
      return {
        ...state,
        allowedSports: action.payload,
      }
    case SET_ALLOWED_TYPES:
      return {
        ...state,
        allowedTypes: action.payload,
      }
    case SET_SPORT_FILTER:
      return {
        ...state,
        sportFilter: action.payload,
      }
    case SET_TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.payload,
      }
    case SET_NAME_SEARCH:
      return {
        ...state,
        searchValue: action.payload,
      }
    case SET_CURRENT_CONTRACT:
      return {
        ...state,
        currentContract: action.payload,
      }
    case SET_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
      }
    case SET_ORG_TYPES:
      return {
        ...state,
        orgTypes: action.payload,
      }
    case SET_CONTRACT_TYPES:
      return {
        ...state,
        contractTypes: action.payload,
      }
    default:
      return state
  }
}

export default foundationReducer
