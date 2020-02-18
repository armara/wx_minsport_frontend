import { createSelector } from 'reselect'
import dayjs from 'utils/day'

import {
  initOrgPair,
  initAreaPair,
  initZonePair,
} from 'store/reducers/schedule/scheduleReducer'
import { foundationOrganizationsWithContracts } from 'store/selectors/foundation'
import { userAreasSelector, userAllZones } from 'store/selectors/user'
import { selectPersons } from 'store/selectors/groups/persons'
import {
  selectCurrentGroup,
  selectPositions,
} from 'store/selectors/groups/groups'
import { selectPersonsByMode } from 'store/selectors/registry'

import { TIME_FORMAT } from 'utils/localization'
import filterPredicate from 'utils/filterPredicate'
import config from 'config'

const {
  BACKEND_URL,
  service: { personsV3 },
} = config

export const scheduleSelector = state => state.schedule

export const scheduleItemSelector = createSelector(
  scheduleSelector,
  schedule => schedule.scheduleItem
)

export const scheduleItemForEditSelector = createSelector(
  scheduleSelector,
  schedule => schedule.scheduleItemForEdit
)

export const scheduleEventItemForEdit = createSelector(
  scheduleItemForEditSelector,
  () => ({})
)

export const selectScheduleItemRepeatTypes = createSelector(
  scheduleSelector,
  schedule => schedule.scheduleItemRepeatTypes
)

export const humanizedScheduleItemForEditSelector = createSelector(
  scheduleItemForEditSelector,
  selectPersonsByMode,
  userAllZones,
  (scheduleItem = {}, coaches = [], zones = []) => {
    const {
      dateTimeEnd,
      dateTimeBegin,
      zones: itemZones = [],
      coaches: itemCoaches = [],
    } = scheduleItem

    const coach = coaches.find(
      ({ id: _coachId }) =>
        !!itemCoaches.find(eventCoachId => eventCoachId === _coachId)
    )
    const zone = zones.find(
      ({ id: _zoneId }) =>
        !!itemZones.find(eventZoneId => eventZoneId === _zoneId)
    )

    return {
      ...scheduleItem,
      fromTime: dayjs(dateTimeBegin).format(TIME_FORMAT),
      toTime: dayjs(dateTimeEnd).format(TIME_FORMAT),
      coach,
      zone,
    }
  }
)

export const orgFilterSelector = createSelector(
  scheduleSelector,
  schedule => schedule.orgFilter
)

export const areaFilterSelector = createSelector(
  scheduleSelector,
  schedule => schedule.areaFilter
)

export const zoneFilterSelector = createSelector(
  scheduleSelector,
  schedule => schedule.zoneFilter
)

export const selectOrgFilterPairs = createSelector(
  foundationOrganizationsWithContracts,
  organizationsWithContracts => {
    return [
      initOrgPair,
      ...organizationsWithContracts.map(
        ({ organizationId, organizationName }) => ({
          id: organizationId,
          item: organizationName,
        })
      ),
    ]
  }
)

export const selectAreaFilterPairs = createSelector(
  userAreasSelector,
  userAreas => [
    initAreaPair,
    ...userAreas.map(({ id, name }) => ({ id, item: name })),
  ]
)

export const selectZoneFilterPairs = createSelector(
  areaFilterSelector,
  userAllZones,
  (selectedArea, allZones) => {
    const zonesOfArea = allZones.filter(zone => zone.areaId === selectedArea.id)
    if (zonesOfArea.length)
      return [
        initZonePair,
        ...zonesOfArea.map(({ id, name }) => ({ id, item: name })),
      ]
    return [
      initZonePair,
      ...allZones.map(({ id, name }) => ({ id, item: name })),
    ]
  }
)

export const selectEvents = createSelector(
  scheduleSelector,
  schedule => schedule.events
)

export const selectSchedules = createSelector(
  scheduleSelector,
  schedule => schedule.schedules
)

export const selectMonthSchedules = createSelector(
  selectSchedules,
  userAllZones,
  selectEvents,

  (schedules, allZones, events) => {
    return schedules.map(sch => {
      const { zones: scheduleZones } = sch
      const areasSet = new Set()
      allZones.forEach(zone => {
        if (scheduleZones.includes(zone.id)) {
          areasSet.add(zone.areaId)
        }
      })

      const { facilityId, groupId, orgId, sportId, subdistrictId } =
        events.find(ev => ev.title === sch.title) || {}

      return {
        ...sch,
        facilityId,
        groupId,
        orgId,
        sportId,
        subdistrictId,
        areas: [...areasSet],
      }
    })
  }
)

export const selectPreparedSchedules = createSelector(
  orgFilterSelector,
  areaFilterSelector,
  zoneFilterSelector,
  selectMonthSchedules,
  (org, area, zone, monthSchedules) => {
    const orgPredicate = filterPredicate(
      org.id !== 0,
      item => item.orgId === org.id
    )
    const zonePredicate = filterPredicate(zone.id !== 0, item =>
      item.zones.includes(zone.id)
    )
    const areaPredicate = filterPredicate(area.id !== 0, item =>
      item.areas.includes(area.id)
    )

    return monthSchedules.filter(
      item => orgPredicate(item) && zonePredicate(item) && areaPredicate(item)
    )
  }
)

export const selectCurrentDate = createSelector(
  scheduleSelector,
  schedule => schedule.currentDate
)

export const selectIsScheduleModalOpen = createSelector(
  scheduleSelector,
  schedule => schedule.isScheduleModalOpen
)

export const selectScheduleId = createSelector(
  scheduleSelector,
  schedule => schedule.selectedScheduleId
)

export const selectSelectedSchedule = createSelector(
  selectScheduleId,
  selectPreparedSchedules,
  userAllZones,
  userAreasSelector,
  selectPersons,
  foundationOrganizationsWithContracts,
  selectCurrentGroup,
  selectPositions,
  (
    schedlueId,
    schedules,
    zones,
    areas,
    coaches,
    contracts,
    currentGroup,
    positions
  ) => {
    const selectedSchedule = schedules.find(({ id }) => id === schedlueId) || {
      zones: [],
      areas: [],
      coaches: [],
    }
    const { organizationName } =
      contracts.find(({ id }) => id === selectedSchedule.orgId) || {}
    const { title } =
      zones.find(({ id }) => selectedSchedule.zones.includes(id)) || {}
    const { name } =
      areas.find(({ id }) => selectedSchedule.areas.includes(id)) || {}
    const areaAndZone = title && name ? `${title}, ${name}` : ' -- '

    const initCoach = { id: '', firstName: '', surName: '' }
    const initMember = { personId: '', positionId: '' }
    let coach

    if (selectedSchedule.coaches.length !== 0) {
      coach =
        coaches.find(({ id: cid }) => selectedSchedule.coaches.includes(cid)) ||
        initCoach
    } else if (selectedSchedule.groupId) {
      const { members = [] } = currentGroup || {}
      const member =
        members.find(m =>
          positions.find(p => p.id === m.positionId && p.title.match(/тренер/i))
        ) || initMember
      coach =
        coaches.find(({ id: cid }) => cid === member.personId) || initCoach
    } else {
      coach = initCoach
    }

    const { id: coachId, firstName, surName } = coach
    const fio = `${firstName} ${surName}`
    const avatar = `${BACKEND_URL}${personsV3}/person/${coachId}/avatar`

    return {
      ...selectedSchedule,
      areaAndZone,
      fio,
      avatar,
      coachId,
      organizationName,
    }
  }
)
