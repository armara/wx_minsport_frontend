import { createSelector } from 'reselect'

export const eventsSelector = state => state.events

export const eventsTypesSelector = createSelector(
  eventsSelector,
  events => events.types
)
