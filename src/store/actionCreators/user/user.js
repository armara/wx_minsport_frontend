import flatten from 'lodash.flatten'
import api from 'utils/api'
import {
  getUserWorkplaceId,
  getWhereUserWorks as getUserWorkplaces,
} from 'utils/user'

import {
  setFacility,
  setIsLoading,
  setError,
  setAreas,
  setZones,
  setAllZones,
  setWhereUserWorks,
  setAllFacilities,
} from 'store/actions/user/user'
import { userAreasSelector, userSelectedAreaId } from 'store/selectors/user'

const facilityId = getUserWorkplaceId()

export const getFacility = () => async dispatch => {
  const response = await api().getFacilityById(facilityId)
  const { data } = response

  dispatch(setFacility(data))
}

export const getAreas = () => async dispatch => {
  dispatch(setIsLoading(true))

  let isError = false
  const result = await api()
    .getAreas()
    .catch(error => {
      isError = true
      dispatch(setError({ status: 'error', message: error }))
    })

  if (isError) return

  const { data: { areas = [] } = {} } = result
  dispatch(setAreas([...areas]))
  dispatch(setIsLoading(false))
}

export const getZones = () => async (dispatch, getState) => {
  const areaId = userSelectedAreaId(getState())
  if (!areaId) return
  dispatch(setIsLoading(true))

  let isError = false
  const result = await api()
    .getZones(areaId)
    .catch(error => {
      isError = true
      dispatch(setError({ status: 'error', message: error }))
    })
  if (isError) return

  const { data: { zones = [] } = {} } = result
  dispatch(setIsLoading(false))
  dispatch(setZones([...zones]))
}

export const getAllZones = () => async (dispatch, getState) => {
  let allAreas = userAreasSelector(getState())
  if (userAreasSelector(getState()).length === 0) {
    const { data: { areas = [] } = {} } = await api().getAreas()
    allAreas = areas
  }

  const res = await Promise.all(
    allAreas.map(async item => {
      return api().getZones(item.id)
    })
  )

  const allZones = flatten(res.map(item => item.data.zones)).map(item => ({
    title: item.name,
    ...item,
  }))

  dispatch(setAllZones(allZones))
  return allZones
}

export const getAllFacilities = () => async dispatch => {
  const facilitiesResponse = await api().getAllFacilities()
  dispatch(setAllFacilities((facilitiesResponse.data || {}).facilities || []))
}

export const getWhereUserWorks = () => async dispatch => {
  const {
    facilities = [],
    organizations = [],
    federations = [],
  } = getUserWorkplaces()

  const facilitiesResponses = await Promise.all(
    facilities.map(async id => api().getFacilityById(id))
  )
  const organizationsResponses = await Promise.all(
    organizations.map(async id => api().getOrganizationById(id))
  )
  const federationsResponses = await Promise.all(
    federations.map(async id => api().getFederationById(id))
  )

  const userFacilities = (
    facilitiesResponses.map(({ data }) => ({
      ...data,
      workplaceType: 'facilities',
    })) || []
  ).filter(workplace => !workplace.errors)
  const userOrganizations = organizationsResponses.map(
    ({ data: { data } = {} }) => ({
      ...data,
      workplaceType: 'organizations',
    })
  )
  const userFederations = federationsResponses.map(({ data }) => ({
    ...data,
    workplaceType: 'federations',
  }))

  dispatch(
    setWhereUserWorks([
      ...userFacilities,
      ...userOrganizations,
      ...userFederations,
    ])
  )
}
