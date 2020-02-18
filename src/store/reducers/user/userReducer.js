import {
  SET_FACILITY,
  SET_IS_LOADING,
  SET_ERROR,
  SET_AREAS,
  SET_ZONES,
  SELECT_AREA_ID,
  SET_ALL_ZONES,
  SET_ALL_FACILITIES,
  SET_WHERE_USER_WORKS,
} from 'store/types/user'

const initialState = {
  facility: {},
  areas: [],
  allZones: [],
  allFacilities: [],
  zones: [],
  whereUserWorks: [],
  selectedAreaId: null,
  isLoading: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_FACILITIES:
      return {
        ...state,
        allFacilities: action.payload,
      }
    case SET_WHERE_USER_WORKS:
      return {
        ...state,
        whereUserWorks: action.payload,
      }
    case SET_FACILITY:
      return {
        ...state,
        facility: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case SET_AREAS:
      return {
        ...state,
        areas: [...action.payload],
      }
    case SET_ZONES:
      return {
        ...state,
        zones: [...action.payload],
      }
    case SET_ALL_ZONES:
      return {
        ...state,
        allZones: action.payload,
      }
    case SELECT_AREA_ID:
      return {
        ...state,
        selectedAreaId: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
