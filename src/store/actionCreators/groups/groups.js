import api, { requestIfIdDefined } from 'utils/api'

import { getUserWorkplaceType, getUserWorkplaceId } from 'utils/user'
import { selectGroupsIsLoading } from 'store/selectors/groups/groups'
import {
  setPositions,
  setIsLoading,
  setGroups,
  setCurrentGroup,
} from 'store/actions/groups/groups'

const workplaceId = getUserWorkplaceId()
const prefix = getUserWorkplaceType()

/* eslint-disable no-console, no-alert */
export const getGroups = (query = '') => async dispatch => {
  dispatch(setIsLoading(true))

  let parsedQuery = query
  if (query.startsWith('?')) {
    parsedQuery += `&ownerOrgId=${workplaceId}`
  } else if (workplaceId) {
    parsedQuery = `?ownerOrgId=${workplaceId}`
  } else {
    parsedQuery = ''
  }

  const response = await api().getGroups(parsedQuery)
  const { data: { data: { groups = [] } = {} } = {} } = response
  dispatch(setGroups(groups))
  dispatch(setIsLoading(false))
  return groups
}

export const getScheduleEventGroups = eventOwnerId => async dispatch => {
  let eventOwnerGroups = []
  if (eventOwnerId !== workplaceId) {
    const eventOwnerGroupsResponse = await api().getGroups(
      `?ownerOrgId=${eventOwnerId}`
    )
    const {
      data: { data: { groups = [] } = {} } = {},
    } = eventOwnerGroupsResponse
    eventOwnerGroups = groups
  }

  const facilityOwnGroupsResponse = await api().getGroups(
    `?ownerOrgId=${workplaceId}`
  )
  const {
    data: { data: { groups: facilityOwnGroups = [] } = {} } = {},
  } = facilityOwnGroupsResponse

  dispatch(setGroups([...facilityOwnGroups, ...eventOwnerGroups]))
}

export const getGroupById = id => async dispatch => {
  dispatch(setIsLoading(true))
  const groupResponse = await api().getGroupById(id)
  const { data: { data } = {} } = groupResponse

  let ownerData
  if (data.ownerFacilityId !== null) {
    ownerData = await requestIfIdDefined(
      _ownerId => api().getFacilityById(_ownerId),
      data.ownerFacilityId
    )
  } else if (data.ownerOrgId !== null) {
    const orgResponse = await requestIfIdDefined(
      _ownerId => api().getOrganizationById(_ownerId),
      data.ownerOrgId
    )
    ownerData = (orgResponse === null ? {} : orgResponse).data
  }

  const sportResponse =
    prefix === 'facilities'
      ? await api().getFacilitySportBy(data.sportId)
      : await api().getSportBy(data.sportId)
  const placeFacilityData = await requestIfIdDefined(
    placeFacilityId => api().getFacilityById(placeFacilityId),
    data.placeFacilityId
  )

  data.owner = ownerData
  data.placeFacility = placeFacilityData

  if (sportResponse.data.errors) {
    data.sport = null
  } else {
    data.sport = sportResponse.data

    if (data.sport.disciplines) {
      data.disciplineTitle = data.sport.disciplines.filter(
        disc => disc.id === data.disciplineId
      )[0].title
    } else {
      data.disciplineTitle = ''
    }
  }

  dispatch(setCurrentGroup(data))
  dispatch(setIsLoading(false))
}

export const addGroup = body => async (dispatch, getState) => {
  const state = getState()
  const isLoading = selectGroupsIsLoading(state)

  if (isLoading) return

  dispatch(setIsLoading(true))
  await api().postGroup(body)
  dispatch(setIsLoading(false))
}

export const updateGroup = (body, id) => async dispatch => {
  dispatch(setIsLoading(true))
  await api().putGroup(body, id)
  dispatch(setIsLoading(false))
}

export const deleteGroup = (id, body) => async dispatch => {
  dispatch(setIsLoading(true))
  await api().deleteGroup(id, body)
  dispatch(setIsLoading(false))
}

export const getPositions = () => async dispatch => {
  dispatch(setIsLoading(true))
  const {
    data: { data: { positions = [] } = {} } = {},
  } = await api().getPositions()

  dispatch(setPositions(positions))
  dispatch(setIsLoading(false))
  return positions
}
