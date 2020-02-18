import api from 'utils/api'
import { setAbonnements } from 'store/actions/abonnement/abonnement'

const getAbonnementsAll = () => async dispatch => {
  const {
    data: { abonnements },
  } = await api().getAllAbonnements()
  dispatch(setAbonnements(abonnements))
}

export default getAbonnementsAll
