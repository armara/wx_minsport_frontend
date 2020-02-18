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

export const setFacility = payload => ({
  type: SET_FACILITY,
  payload,
})

export const setAreas = payload => ({
  type: SET_AREAS,
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

export const setAreaId = areaId => ({
  type: SELECT_AREA_ID,
  payload: areaId,
})

export const setZones = payload => ({
  type: SET_ZONES,
  payload,
})

export const setAllZones = payload => ({
  type: SET_ALL_ZONES,
  payload,
})

export const setAllFacilities = payload => ({
  type: SET_ALL_FACILITIES,
  payload,
})

export const setWhereUserWorks = payload => ({
  type: SET_WHERE_USER_WORKS,
  payload,
})
