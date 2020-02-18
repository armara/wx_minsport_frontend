import api from 'utils/api'

import {
  setPersons,
  setIsLoading,
  setCurrentPerson,
} from 'store/actions/groups/persons'
import { getFullPersons } from 'store/actionCreators/registry/registry'

import { getUserWorkplaceType, getUserWorkplaceId } from 'utils/user'

const facilityId = getUserWorkplaceId()
const prefix = getUserWorkplaceType()

// eslint-disable-next-line import/prefer-default-export
export const getPersons = (query = '') => async dispatch => {
  dispatch(setIsLoading(true))

  let parsedQuery = query
  if (prefix === 'facilities') {
    if (query.startsWith('?')) {
      parsedQuery += `&facilityId=${facilityId}`
    } else {
      parsedQuery = `?facilityId=${facilityId}`
    }
  }

  const { data: { data: { persons = [] } = {} } = {} } = await api().getPersons(
    parsedQuery
  )

  dispatch(setPersons(persons))
  dispatch(setIsLoading(false))
  return persons
}

export const getCurrentPersonById = personId => async dispatch => {
  dispatch(setIsLoading(true))

  const response = await api().getPersonById(personId)
  const {
    data: { data = {} },
  } = response

  dispatch(setCurrentPerson(data))
  dispatch(setIsLoading(false))
}

export const createPerson = ({
  body,
  photo: loadPhoto = {},
  callback,
}) => async dispatch => {
  dispatch(setIsLoading(true))
  const { data: { data: response = {} } = {} } = await api().addPerson(body)
  if (Object.keys(response).length > 0) {
    const { id: personId } = response

    if (Object.keys(loadPhoto).length > 0) {
      const { file } = loadPhoto
      const formData = new FormData()
      formData.append('file', file)
      await api().uploadPersonAvatar2(personId, formData)
    }

    dispatch(getFullPersons('', true))
    dispatch(setIsLoading(false))
    if (callback) {
      callback()
    }
  }
}

export const updatePerson = ({
  body,
  photo: loadPhoto = {},
  callback,
}) => async dispatch => {
  dispatch(setIsLoading(true))
  const { id: personId = '', ...bodyWithoutId } = body

  if (Object.keys(loadPhoto).length > 0) {
    const { file } = loadPhoto
    const formData = new FormData()
    formData.append('file', file)

    await api().uploadPersonAvatar2(personId, formData)
  }

  await api().updatePerson(personId, bodyWithoutId)
  dispatch(getFullPersons('', true))

  dispatch(setIsLoading(false))
  if (callback) {
    callback()
  }
}

export const deletePersonById = (id, body) => async dispatch => {
  dispatch(setIsLoading(true))
  const response = await api().removePerson(id, body)
  dispatch(setIsLoading(false))
  return response
}
