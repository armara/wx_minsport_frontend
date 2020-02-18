import pick from 'lodash.pick'
import { trainIntervals } from 'utils/trainIntervals'
import {
  ADD_ITEM,
  SET_ERROR,
  SET_IS_LOADING,
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

const initOrgPair = {
  id: 0,
  item: 'Все организации',
  placeholder: 'Выбрать организацию',
}
const initAreaPair = {
  id: 0,
  item: 'Все помещения',
  placeholder: 'Выбрать помещение',
}
const initZonePair = { id: 0, item: 'Все зоны', placeholder: 'Выбрать зону' }

const initialState = {
  isLoading: false,
  error: [],
  scheduleItem: {
    district_id: '',
    event_type_id: '',
    participant_count: 0,
    responsible_organization_id: '',
    responsible_person_type_id: '',
    sport_type_id: '',
    title: '',
  },
  orgFilter: initOrgPair,
  areaFilter: initAreaPair,
  zoneFilter: initZonePair,
  scheduleItemRepeatTypes: trainIntervals,

  events: [],
  schedules: [],
  currentDate: new Date(),
  isScheduleModalOpen: false,
  selectedScheduleId: '',

  scheduleItemForEdit: {},
}

const scheduleItemKeys = Object.keys(initialState.scheduleItem)

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCHEDULE_ITEM_REPEAT_TYPES:
      return {
        ...state,
        scheduleItemRepeatTypes: action.payload,
      }
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      }

    case SET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
      }
    case SET_SCHEDULE_ITEM_FOR_EDIT:
      return {
        ...state,
        scheduleItemForEdit: action.payload,
      }

    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
      }

    case ADD_ITEM:
      return {
        ...state,
        scheduleItem: pick(action.payload, scheduleItemKeys),
      }
    case SET_ERROR:
      return {
        ...state,
        error: [...state.error, action.payload],
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    case SET_ORG_FILTER:
      return {
        ...state,
        orgFilter: action.payload,
      }
    case SET_AREA_FILTER:
      return {
        ...state,
        areaFilter: action.payload,
      }
    case SET_ZONE_FILTER:
      return {
        ...state,
        zoneFilter: action.payload,
      }

    case SET_SCHEDULE_MODAL:
      return {
        ...state,
        isScheduleModalOpen: action.payload,
      }

    case SET_SELECTED_SCHEDULE_ID:
      return {
        ...state,
        selectedScheduleId: action.payload,
      }

    default:
      return state
  }
}

export { scheduleReducer as default, initOrgPair, initAreaPair, initZonePair }
