import { createSelector } from 'reselect'

export const userSelector = state => state.user

export const userFacilitySelector = createSelector(
  userSelector,
  user => user.facility || {}
)

export const userFacilitySubdistrictIdSelector = createSelector(
  userFacilitySelector,
  facility => facility.subdistrictId
)

export const userAreasSelector = createSelector(
  userSelector,
  user => user.areas
)

export const userAreasSelectorWithTitleKey = createSelector(
  userAreasSelector,
  areas => areas.map(({ name, ...rest }) => ({ ...rest, title: name }))
)

export const userZones = createSelector(
  userSelector,
  user => user.zones
)

export const userZonesWithTitleKey = createSelector(
  userZones,
  zones => zones.map(({ name, ...rest }) => ({ ...rest, title: name }))
)

export const userAllFacilitiesSelector = createSelector(
  userSelector,
  user => user.allFacilities
)

export const userAllZones = createSelector(
  userSelector,
  user => user.allZones
)

export const userSelectedAreaId = createSelector(
  userSelector,
  user => user.selectedAreaId
)

export const selectWhereUserWorks = createSelector(
  userSelector,
  user => user.whereUserWorks
)
