import api from 'utils/api'

import { setTypes, setIsLoading, setError } from 'store/actions/events/events'

const getEventTypes = () => async dispatch => {
  dispatch(setIsLoading(true))

  let isError = false
  const result = await api()
    .getEventTypes()
    .catch(error => {
      isError = true
      dispatch(setError({ status: 'error', message: error }))
    })
  if (isError) return

  const { data: { data: { types = [] } = {} } = {} } = result
  dispatch(setIsLoading(false))
  dispatch(setTypes([...types]))
}

export default getEventTypes
