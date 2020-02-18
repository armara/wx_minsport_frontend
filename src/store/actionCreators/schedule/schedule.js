import api from 'utils/api'
import history from 'utils/utils'
import omitBy from 'lodash.omitby'
import isNil from 'lodash.isnil'
import monthInterval from 'utils/monthInterval'
import { getUserWorkplaceId } from 'utils/user'
import { TIME_FORMAT } from 'utils/localization'
import dayjs, { getDateValueOrNull } from 'utils/day'

import {
  initOrgPair,
  initAreaPair,
  initZonePair,
} from 'store/reducers/schedule/scheduleReducer'

import {
  setEvents,
  setSchedules,
  setError,
  setIsLoading,
  setOrgFilter,
  setAreaFilter,
  setZoneFilter,
  setCurrentDate,
  setScheduleModal,
  setSelectedScheduleId,
  setScheduleItemForEdit,
} from 'store/actions/schedule/schedule'
import { getPersons } from 'store/actionCreators/groups/persons'
import { getAllContracts } from 'store/actionCreators/foundation/foundation'
import { getAllZones, getAreas } from 'store/actionCreators/user/user'
import { getGroupById, getPositions } from 'store/actionCreators/groups/groups'

import {
  selectEvents,
  selectSchedules,
  selectCurrentDate,
  selectScheduleId,
  selectMonthSchedules,
  selectSelectedSchedule,
} from 'store/selectors/schedule'
import { selectPersons } from 'store/selectors/groups/persons'
import { foundationContractsSelector } from 'store/selectors/foundation'
import {
  userAllZones,
  userAreasSelector,
  userFacilitySubdistrictIdSelector,
} from 'store/selectors/user'
import { selectPositions } from 'store/selectors/groups/groups'

import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

const facilityId = getUserWorkplaceId()

const scheduleQueryString = date => `?dateTimeFrom=${monthInterval(date).start}&
dateTimeTo=${monthInterval(date).end}&
facilityId=${facilityId}`

const getUTCTime = date => {
  return date.getTime() + date.getTimezoneOffset() * 60000
}

export const getSchedules = date => async dispatch => {
  const response = await api().getSchedules(scheduleQueryString(date))
  const {
    data: { errors: responseErrors = [], data: { schedules = [] } = {} } = {},
  } = response
  if (responseErrors.length > 0) {
    const errorOn = `${responseErrors[0].title} - schedules`
    dispatch(setError(errorOn))
  }

  const formattedSchedules = schedules.map(s => {
    const timeBeginDate = new Date(s.dateTimeBegin)
    const timeBeginTimeStamp = getUTCTime(timeBeginDate)
    const timeEndDate = new Date(s.dateTimeEnd)
    const timeEndTimeStamp = getUTCTime(timeEndDate)

    return {
      ...s,
      scheduleTimeBegin: timeBeginDate,
      scheduleTimeEnd: timeEndDate,
      scheduleStartAccessor: new Date(timeBeginTimeStamp),
      scheduleEndAccessor: new Date(timeEndTimeStamp),
    }
  })
  dispatch(setSchedules(formattedSchedules))
}

export const getEvents = () => async dispatch => {
  const response = await api().getEvents(`?facilityId=${facilityId}`)
  const {
    data: { errors: responseErrors = [], data: { events = [] } = {} } = {},
  } = response
  if (responseErrors.length > 0) {
    const errorOn = `${responseErrors[0].title} - events`
    dispatch(setError(errorOn))
  }

  dispatch(setEvents(events))
}

export const initRelatedStates = date => async (dispatch, getState) => {
  const state = getState()

  if (selectSchedules(state).length === 0) {
    dispatch(getSchedules(date))
  }

  if (selectEvents(state).length === 0) {
    dispatch(getEvents())
  }

  if (selectPersons(state).length === 0) {
    dispatch(getPersons(''))
  }

  if (foundationContractsSelector(state).length === 0) {
    dispatch(getAllContracts())
  }

  if (userAllZones(state).length === 0) {
    dispatch(getAllZones())
  }

  if (userAreasSelector(state).length === 0) {
    dispatch(getAreas())
  }

  if (selectPositions(state).length === 0) {
    dispatch(getPositions())
  }
}

export const resetFilters = () => dispatch => {
  dispatch(setOrgFilter(initOrgPair))
  dispatch(setAreaFilter(initAreaPair))
  dispatch(setZoneFilter(initZonePair))
}

export const initMonthSchedules = () => async dispatch => {
  const dete = new Date()
  dispatch(resetFilters())
  dispatch(setSelectedScheduleId(''))
  dispatch(setCurrentDate(dete))
  dispatch(initRelatedStates(dete))
}

export const changeMonthSchedules = newDate => async dispatch => {
  dispatch(getSchedules(newDate))
  dispatch(setCurrentDate(newDate))
}

export const changeCurrentDate = date => dispatch => {
  dispatch(setCurrentDate(date))
}

export const saveScheduleId = scheduleId => (dispatch, getState) => {
  const state = getState()
  const selectedSchedule =
    selectMonthSchedules(state).find(schedule => schedule.id === scheduleId) ||
    {}
  const { coaches = [], groupId = null } = selectedSchedule
  if (coaches.length === 0 && groupId) {
    dispatch(getGroupById(groupId))
  }
  dispatch(setSelectedScheduleId(scheduleId))
}

export const changeMonth = amount => (dispatch, getState) => {
  const state = getState()
  const changedMonth = moment(selectCurrentDate(state))
    .add(amount, 'month')
    .toDate()
  dispatch(changeMonthSchedules(changedMonth))
  dispatch(setSelectedScheduleId(''))
}

export const changeWeek = amount => (dispatch, getState) => {
  const state = getState()
  const currentDate = selectCurrentDate(state)
  const changedWeek = moment(currentDate)
    .add(amount, 'week')
    .toDate()

  if (currentDate.getMonth() !== changedWeek.getMonth()) {
    dispatch(changeMonthSchedules(changedWeek))
  } else {
    dispatch(setCurrentDate(changedWeek))
  }
  dispatch(setSelectedScheduleId(''))
}

export const changeOrgFilter = orgFilterItem => dispatch => {
  dispatch(setOrgFilter(orgFilterItem))
}

export const changeAreaFilter = nextAreaFilterItem => (dispatch, getState) => {
  const state = getState()
  const {
    schedule: { areaFilter: prevAreaFilterItem },
  } = state
  dispatch(setAreaFilter(nextAreaFilterItem))
  if (prevAreaFilterItem.id !== nextAreaFilterItem.id) {
    dispatch(setZoneFilter(initZonePair))
  }
}

export const changeZoneFilter = zoneFilterItem => dispatch => {
  dispatch(setZoneFilter(zoneFilterItem))
}

const getIdOrNull = obj => (!obj ? null : obj.id)
const retrieveSportId = (sport, group) => (group ? group.sportId : sport.id)

const spreadEventOnWeek = ({
  days,
  zone,
  toTime,
  coaches,
  fromTime,
  repeatType,
}) => {
  const startOfCurrentDay = dayjs().startOf('day')
  const timeBegin = dayjs(fromTime, TIME_FORMAT).diff(
    startOfCurrentDay,
    'millisecond'
  )
  const timeEnd = dayjs(toTime, TIME_FORMAT).diff(
    startOfCurrentDay,
    'millisecond'
  )

  const coachesIds =
    coaches.length === 0 ? [] : coaches.map(({ coach: { id } = {} }) => id)
  const templateForOneDay = {
    timeEnd,
    timeBegin,
    repeatWeekDay: null /* fulfill below */,
    coaches: [...new Set([...coachesIds])],
    repeatType: !repeatType ? null : repeatType.id,
    zones: !zone ? null : [zone.id] /* sad but true */,
  }

  if (days.length === 0) {
    return [templateForOneDay]
  }

  return days.map(({ id }) => ({
    ...templateForOneDay,
    repeatWeekDay: id,
  }))
}

export const createScheduleEvent = formValues => async (dispatch, getState) => {
  const subdistrictId = userFacilitySubdistrictIdSelector(getState())

  const {
    days,
    zone,
    sport,
    title,
    toDate,
    toTime,
    isOpen,
    coaches,
    fromTime,
    fromDate,
    eventType,
    repeatType,
    membersList,
    shouldSkipHolidays,
    organizationsWithContracts,
    isBlocking /* to occupy entire facility */,
    facility /* facility an event will take place into */,
  } = formValues

  const group = membersList[0]
  const groupId = getIdOrNull(group)
  const dateEnd = getDateValueOrNull(toDate)
  const sportId = retrieveSportId(sport, group)
  const dateBegin = getDateValueOrNull(fromDate)
  const facilityIdToApprove = getIdOrNull(facility)
  const orgId = getIdOrNull(organizationsWithContracts)
  const templates = spreadEventOnWeek({
    days,
    zone,
    toTime,
    fromTime,
    repeatType,
    coaches: coaches.filter(coach => !!coach) /* may be null */,
  })

  const body = omitBy(
    {
      title,
      orgId,
      sportId,
      dateEnd,
      groupId,
      templates,
      dateBegin,
      reason: '',
      facilityId,
      isBlocking,
      subdistrictId,
      facilityIdToApprove,
      eventTypeId: eventType.id,
      public: !!isOpen /* back requires true | false */,
      holidays: !!shouldSkipHolidays /* back requires true | false */,
    },
    isNil
  )
  await api().addEventItem(body)
  history.push(`/facilities/schedule`)
}

export const deleteSchedule = () => async (dispatch, getState) => {
  const state = getState()
  const scheduleId = selectScheduleId(state)
  const currentDate = selectCurrentDate(state)
  const body = { reason: '' }

  await api().removeSchedule(scheduleId, body)
  dispatch(setSelectedScheduleId(''))
  dispatch(getSchedules(currentDate))
  dispatch(setScheduleModal(false))
}

export const deleteEvent = () => async (dispatch, getState) => {
  const state = getState()
  const currentDate = selectCurrentDate(state)
  const { eventId } = selectSelectedSchedule(state)
  const body = { reason: '' }

  await api().removeEvent(eventId, body)
  dispatch(setSelectedScheduleId(''))
  dispatch(getSchedules(currentDate))
  dispatch(getEvents())
  dispatch(setScheduleModal(false))
}

export const editScheduleItem = (body, id, callback) => async dispatch => {
  dispatch(setIsLoading(true))

  let isError = false
  await api()
    .editScheduleItem(body, id)
    .catch(error => {
      isError = true
      dispatch(setError({ status: 'error', message: error }))
    })
  if (isError) return
  dispatch(setIsLoading(false))
  // eslint-disable-next-line no-unused-expressions
  typeof callback === 'function' && callback()
}

export const getScheduleItemForEditById = id => async dispatch => {
  const {
    data: { data },
  } = await api().getScheduleById(id)
  dispatch(setScheduleItemForEdit(data))
}
