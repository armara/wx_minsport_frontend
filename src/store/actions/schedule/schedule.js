import {
  ADD_ITEM,
  SET_IS_LOADING,
  SET_ERROR,
  SET_ORG_FILTER,
  SET_AREA_FILTER,
  SET_ZONE_FILTER,
  SET_EVENTS,
  SET_SCHEDULES,
  SET_CURRENT_DATE,
  SET_SCHEDULE_MODAL,
  SET_SELECTED_SCHEDULE_ID,
  SET_SCHEDULE_ITEM_FOR_EDIT,
  SET_SCHEDULE_ITEM_REPEAT_TYPES,
} from 'store/types/schedule'

export const setScheduleItemRepeatTypes = payload => ({
  type: SET_SCHEDULE_ITEM_REPEAT_TYPES,
  payload,
})

export const setEvents = payload => ({
  type: SET_EVENTS,
  payload,
})

export const setScheduleItemForEdit = payload => ({
  type: SET_SCHEDULE_ITEM_FOR_EDIT,
  payload,
})

export const setSchedules = payload => ({
  type: SET_SCHEDULES,
  payload,
})

export const setCurrentDate = payload => ({
  type: SET_CURRENT_DATE,
  payload,
})

export const addItem = payload => ({
  type: ADD_ITEM,
  payload,
})

export const setIsLoading = payload => ({
  type: SET_IS_LOADING,
  payload,
})

export const setError = payload => ({
  type: SET_ERROR,
  payload,
})

export const setOrgFilter = payload => ({
  type: SET_ORG_FILTER,
  payload,
})

export const setAreaFilter = payload => ({
  type: SET_AREA_FILTER,
  payload,
})

export const setZoneFilter = payload => ({
  type: SET_ZONE_FILTER,
  payload,
})

export const setScheduleModal = payload => ({
  type: SET_SCHEDULE_MODAL,
  payload,
})

export const setSelectedScheduleId = payload => ({
  type: SET_SELECTED_SCHEDULE_ID,
  payload,
})
