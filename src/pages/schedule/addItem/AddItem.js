import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import createDecorator from 'final-form-calculate'

import {
  isTraining,
  trainIntervals,
  trainSpecificIntervalIds,
} from 'utils/trainIntervals'
import { currentDay } from 'utils/day'

import BackButton from 'components/button/backButton/BackButton'
import ScheduleForm from 'pages/schedule/components/scheduleForm/ScheduleForm'

import {
  getZones,
  getAreas,
  getAllZones,
  getFacility,
  getAllFacilities,
} from 'store/actionCreators/user/user'
import { setAreaId } from 'store/actions/user/user'
import { createScheduleEvent } from 'store/actionCreators/schedule/schedule'
import getEventTypes from 'store/actionCreators/events/events'
import {
  getFullPersons,
  getPersonsMode,
  getFacilitySports,
} from 'store/actionCreators/registry/registry'
import { getScheduleEventGroups } from 'store/actionCreators/groups/groups'
import { getAllContracts } from 'store/actionCreators/foundation/foundation'
import { setScheduleItemRepeatTypes } from 'store/actions/schedule/schedule'
import { userFacilitySubdistrictIdSelector } from 'store/selectors/user'

import { scheduleItemSelector } from 'store/selectors/schedule'
import './AddItem.scss'

const decorator = createDecorator({
  field: 'eventType',
  updates: {
    /* resets all federation-specific fields */
    repeatType: (
      { title },
      { repeatType, repeatType: { id: repeatTypeId } = {} } = {}
    ) =>
      !isTraining(title) && trainSpecificIntervalIds.includes(repeatTypeId)
        ? ''
        : repeatType,
    days: ({ title }, { days }) => (isTraining(title) ? days : []),
    isBlocking: ({ title }, { isBlocking }) =>
      isTraining(title) ? null : isBlocking,
    facility: ({ title }, { facility = {} }) =>
      isTraining(title) ? null : facility,
  },
})

const initialValues = {
  days: [],
  membersList: [],
  toDate: currentDay,
  fromDate: currentDay,
  coaches: [null] /* one item at least */,
}

/* smart */
const AddItem = ({
  selectArea,
  fetchAreas,
  fetchZones,
  createEvent,
  fetchSports,
  fetchFacility,
  fetchAllZones,
  setRepeatTypes,
  setCoachesMode,
  fetchContracts,
  fetchEventTypes,
  fetchFullPersons,
  fetchAllFacilities,
  fetchScheduleEventGroups,
}) => {
  const [rendererConfig, setRendererConfig] = useState({})

  useEffect(() => {
    fetchAreas()
    fetchSports()
    fetchFacility()
    fetchAllZones()
    fetchContracts()
    setCoachesMode()
    fetchEventTypes()
    fetchFullPersons()
    fetchAllFacilities()
  }, [
    fetchAreas,
    fetchSports,
    fetchFacility,
    fetchAllZones,
    setCoachesMode,
    fetchContracts,
    fetchEventTypes,
    fetchFullPersons,
    fetchAllFacilities,
  ])

  const onEventTypeChange = useCallback(
    ({ title }) => {
      if (!title || title.toLowerCase().includes('тренировка')) {
        setRendererConfig(currentRendererConfig => ({
          ...currentRendererConfig,
          isEventOpen: true,
          shouldRenderDays: true,
          shouldRenderFacilities: false,
        }))

        setRepeatTypes(trainIntervals)
      } else {
        setRendererConfig(currentRendererConfig => ({
          ...currentRendererConfig,
          isEventOpen: false,
          shouldRenderDays: false,
          shouldRenderFacilities: true,
        }))

        setRepeatTypes(
          trainIntervals.filter(
            ({ id }) => !trainSpecificIntervalIds.includes(id)
          )
        )
      }
    },
    [setRendererConfig, setRepeatTypes]
  )

  const onRepeatTypeChange = useCallback(
    value => {
      const { id: eventTypeId } = value
      if (eventTypeId === 'DAY_OF_WEEK') {
        setRendererConfig(currentRendererConfig => ({
          ...currentRendererConfig,
          areDaysDisabled: false,
        }))
      } else {
        setRendererConfig(currentRendererConfig => ({
          ...currentRendererConfig,
          areDaysDisabled: true,
        }))
      }
    },
    [setRendererConfig]
  )

  const onOrganizationsWithContractsChange = useCallback(
    ({ id: orgId }) => fetchScheduleEventGroups(orgId),
    [fetchScheduleEventGroups]
  )

  const onAreaChange = useCallback(
    ({ id: areaId }) => {
      selectArea(areaId)
      fetchZones()
    },
    [fetchZones, selectArea]
  )

  return (
    <div className="add-schedule-item">
      <BackButton text="Добавить занятие / мероприятие" />
      <hr />
      <ScheduleForm
        {...rendererConfig}
        submit={createEvent}
        decorators={[decorator]}
        onAreaChange={onAreaChange}
        initialValues={initialValues}
        onEventTypeChange={onEventTypeChange}
        onRepeatTypeChange={onRepeatTypeChange}
        onOrganizationsWithContractsChange={onOrganizationsWithContractsChange}
      />
    </div>
  )
}

AddItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
  fetchZones: PropTypes.func.isRequired,
  fetchAreas: PropTypes.func.isRequired,
  selectArea: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  fetchSports: PropTypes.func.isRequired,
  fetchFacility: PropTypes.func.isRequired,
  fetchAllZones: PropTypes.func.isRequired,
  setRepeatTypes: PropTypes.func.isRequired,
  fetchContracts: PropTypes.func.isRequired,
  setCoachesMode: PropTypes.func.isRequired,
  fetchEventTypes: PropTypes.func.isRequired,
  fetchFullPersons: PropTypes.func.isRequired,
  fetchAllFacilities: PropTypes.func.isRequired,
  event: PropTypes.shape({}).isRequired,
  fetchScheduleEventGroups: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  event: scheduleItemSelector(state),
  subdistrictId: userFacilitySubdistrictIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchZones: () => dispatch(getZones()),
  fetchAreas: () => dispatch(getAreas()),
  fetchFacility: () => dispatch(getFacility()),
  fetchAllZones: () => dispatch(getAllZones()),
  fetchSports: () => dispatch(getFacilitySports()),
  fetchEventTypes: () => dispatch(getEventTypes()),
  selectArea: areaId => dispatch(setAreaId(areaId)),
  fetchContracts: () => dispatch(getAllContracts()),
  fetchFullPersons: () => dispatch(getFullPersons()),
  fetchAllFacilities: () => dispatch(getAllFacilities()),
  setCoachesMode: () => dispatch(getPersonsMode('coaches')),
  createEvent: formValues => dispatch(createScheduleEvent(formValues)),
  fetchScheduleEventGroups: orgId => dispatch(getScheduleEventGroups(orgId)),
  setRepeatTypes: repeatTypes =>
    dispatch(setScheduleItemRepeatTypes(repeatTypes)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddItem)
)
