import axios from 'axios'
import debounce from 'lodash.debounce'

import { getUserData, createWorkplace, updateUserData } from 'utils/user'
import api from 'utils/api'
import history from 'utils/utils'
import dayjs, { hasTimePassed } from 'utils/day'

const MILLISECONDS_BEFORE_REFRESH_REQUEST = 1000

export const isAuthenticated = () => Object.keys(getUserData()).length > 0

const getUserDataFromResponse = response => {
  const {
    data: {
      access_token: accessToken,
      email,
      jti,
      phone,
      facilities,
      federations,
      organizations,
      ministries,
      first_name: firstName,
      sur_name: surName,
      patronymic_name: patronymicName,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      token_type: tokenType,
    } = {},
  } = response

  const facilitiesIds = Object.keys(facilities)
  const federationsIds = Object.keys(federations)
  const organizationsIds = Object.keys(organizations)
  const ministriesIds = Object.keys(ministries)

  return {
    accessToken,
    email,
    jti,
    firstName: firstName || '',
    surName: surName || '',
    patronymicName: patronymicName || '',
    phone,
    facilities: facilitiesIds,
    federations: federationsIds,
    organizations: organizationsIds,
    ministries: ministriesIds,
    expiresIn,
    refreshToken,
    tokenType,
  }
}

const chooseInitialUserWorkplace = ({
  facilities,
  organizations,
  federations,
  ministries,
}) => {
  let type
  let id
  if (facilities.length > 0) {
    type = 'facilities'
    ;[id] = facilities
  } else if (organizations.length > 0) {
    type = 'organizations'
    ;[id] = organizations
  } else if (federations.length > 0) {
    type = 'federations'
    ;[id] = federations
  } else if (ministries.length > 0) {
    type = 'ministries'
    ;[id] = ministries
  }

  return createWorkplace(type, id)
}

export const login = async ({ username, password }) => {
  const formData = new FormData()
  formData.append('grant_type', 'password')
  formData.append('username', username) // petr007
  formData.append('password', password) // qwerty

  return (
    api()
      .auth(formData)
      .then(response => {
        if (response.status === 200) {
          const userData = getUserDataFromResponse(response)
          const workPlace = chooseInitialUserWorkplace(userData)
          const time = dayjs().toISOString()
          updateUserData(userData, { workPlace, time })
        }

        return response
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
  )
}

export const logout = () => {
  localStorage.removeItem('user')
}

const refreshAccessToken = refreshToken => {
  const formData = new FormData()
  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', refreshToken)

  return api()
    .auth(formData)
    .then(response => {
      if (response.status !== 200) {
        logout()
        window.location.assign('/login')
      }

      const currentUserData = getUserData()
      const nextUserData = getUserDataFromResponse(response)
      const time = dayjs().toISOString()
      updateUserData(currentUserData, { ...nextUserData, time })

      return response
    })
    .catch(() => {
      logout()
      window.location.assign('/login')
    })
}

const debouncedRefreshAccessToken = debounce(
  refreshAccessToken,
  MILLISECONDS_BEFORE_REFRESH_REQUEST,
  {
    leading: true,
    trailing: false,
  }
)

const getValidUserToken = async () => {
  const { time, expiresIn, refreshToken } = getUserData()

  const isPassed = hasTimePassed(time, expiresIn)
  if (isPassed) {
    await debouncedRefreshAccessToken(refreshToken)
    debouncedRefreshAccessToken.cancel()
  }

  return getUserData()
}

export const setupInterceptor = () => {
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  axios.interceptors.request.use(
    async config => {
      const isAuthed = isAuthenticated()

      if (config.url.endsWith('/login')) {
        return config
      }

      if (!isAuthed) {
        history.push('/login')
        return config
      }

      const { accessToken, tokenType } = await getValidUserToken()
      return {
        ...config,
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      }
    },
    error => {
      return Promise.reject(error)
    }
  )
}

export const facilitiesPrefix = 'facilities'
export const organizationsPrefix = 'organizations'
