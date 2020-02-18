import { SET_CURRENT_PAGE, SET_ABONNEMENTS } from 'store/types/abonnement'

export const setCurrentPage = payload => ({
  type: SET_CURRENT_PAGE,
  payload,
})

export const setAbonnements = payload => ({
  type: SET_ABONNEMENTS,
  payload,
})
