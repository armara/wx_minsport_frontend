import { combineReducers } from 'redux'
import user from 'store/reducers/user/userReducer'
import schedule from 'store/reducers/schedule/scheduleReducer'
import events from 'store/reducers/events/eventsReducer'
import foundation from 'store/reducers/foundation/foundationReducer'
import groups from 'store/reducers/groups/groupsReducer'
import registry from 'store/reducers/registry/registryReducer'
import groupsPersons from 'store/reducers/groups/personsReducer'
import abonnements from 'store/reducers/abonnement/abonnementReducer'

export default combineReducers({
  user,
  schedule,
  foundation,
  events,
  groups,
  registry,
  groupsPersons,
  abonnements,
})
