import pick from 'lodash.pick'

export const updateUserData = (currentUserData, nextUserData = {}) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      ...currentUserData,
      ...nextUserData,
    })
  )
}

export const createWorkplace = (type, id) => ({ type, id })

export const getUserData = () => {
  return JSON.parse(localStorage.getItem('user')) || {}
}

export const getUserWorkplace = () => getUserData().workPlace || {}
export const getUserWorkplaceType = () => getUserWorkplace().type || ''
export const getUserWorkplaceId = () => getUserWorkplace().id || ''
const workFields = ['facilities', 'organizations', 'federations', 'ministries']

export const getWhereUserWorks = () => pick(getUserData(), workFields)
const personalFields = ['firstName', 'surName', 'patronymicName', 'email']
export const getUserPersonalFields = () => pick(getUserData(), personalFields)
export const getUserName = () => {
  const {
    firstName = '',
    surName = '',
    patronymicName = '',
  } = getUserPersonalFields()

  return `${surName} ${(firstName[0] || '').toUpperCase()}${
    firstName ? '.' : ''
  } ${(patronymicName[0] || '').toUpperCase()}${
    patronymicName ? '.' : ''
  }`.trim()
}
export const getFullUserName = () => {
  const {
    firstName = '',
    surName = '',
    patronymicName = '',
  } = getUserPersonalFields()

  return `${surName} ${firstName} ${patronymicName}`.trim()
}

export const changeUserWorkplace = (type, id) => {
  const currentUserData = getUserData()
  const nextUserWorkplace = createWorkplace(type, id)
  updateUserData(currentUserData, { workPlace: nextUserWorkplace })
}
