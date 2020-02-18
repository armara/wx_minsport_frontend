import React, { useCallback, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormField from 'components/form/formField/FormField'
import FormTimeRange from 'components/form/formTimeRange/FormTimeRange'
import FormFilterDropdownWithValue from 'components/form/formFilterDropdownWithValue/FormFilterDropdownWithValue'
import ToolTip from 'components/toolTip/window/ToolTipWindow'

import { scheduleHints } from 'utils/hints'

import 'pages/schedule/components/scheduleEditForm/ScheduleEditForm.scss'

import {
  getFullDisciplines,
  getFullPersons,
  getFullSports,
  getPersonsMode,
} from 'store/actionCreators/registry/registry'
import { setAreaId } from 'store/actions/user/user'
import {
  userAllZones,
  userAreasSelector,
  userSelectedAreaId,
} from 'store/selectors/user'
import { foundationOrganizationsWithContracts } from 'store/selectors/foundation'
import { eventsTypesSelector } from 'store/selectors/events'
import { selectPersonsByMode, selectSports } from 'store/selectors/registry'
import { getZones } from 'store/actionCreators/user/user'
import getEventTypes from 'store/actionCreators/events/events'

const {
  eventTimeIntervalHInt,
  eventAreaHint,
  eventZoneHint,
  selectCoachesForEventHint,
} = scheduleHints

const ScheduleEditForm = ({
  areas,
  zones,
  coaches,
  form,
  areaId,
  selectArea,
  savePersonsMode,
  fetchZones,
  fetchDisciplines,
  fetchFullPersons,
}) => {
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedZone, setSelectedZone] = useState('')

  useEffect(() => {
    fetchFullPersons()
    fetchDisciplines()
    savePersonsMode('coaches')
  }, [fetchDisciplines, fetchFullPersons, savePersonsMode])

  useEffect(() => {
    fetchZones()
  }, [areaId, fetchZones])

  const memoizedValidateField = useCallback(
    item => {
      if (item !== selectedArea) {
        setSelectedArea(item)
        setSelectedZone('')
        selectArea(item.id)
        form.change('zone', '')
      }
    },
    [selectedArea, form, selectArea]
  )

  const memoizedValidateZone = useCallback(
    value => {
      if (value !== selectedZone) {
        setSelectedZone(value)
      }
    },
    [setSelectedZone, selectedZone]
  )

  return (
    <div className="schedule-edit-form">
      <>
        <div className="form-some-blocks">
          <FormTimeRange
            isFromRequired
            isToRequired
            fromText="Начало занятия / мероприятия"
            toText="Конец занятия / мероприятия"
            dataTip={eventTimeIntervalHInt}
          />
        </div>

        <div className="form-some-blocks">
          <FormField
            isRequired
            label="Площадка"
            id="field-name"
            name="fieldName"
            dataTip={eventAreaHint}
            inputComponent={FormFilterDropdownWithValue}
            validate={memoizedValidateField}
            inputProps={useMemo(
              () => ({
                itemRenderer: item => item.name,
                getSearchValueFromItem: item => item.name,
                selectedItemRenderer: item => item.name,
                menuId: 'field-name_dropdown',
                items: areas,
                inputPlaceholder: 'Выберите площадку из списка',
                notFoundPlaceholder: 'Такой площадки нет',
              }),
              [areas]
            )}
          />

          <FormField
            isRequired
            label="Зона"
            id="zone-name"
            name="zone"
            dataTip={eventZoneHint}
            inputComponent={FormFilterDropdownWithValue}
            validate={memoizedValidateZone}
            inputProps={useMemo(
              () => ({
                itemRenderer: item => item.name,
                getSearchValueFromItem: item => item.name,
                selectedItemRenderer: item => item.name,
                menuId: 'zone-name_dropdown',
                items: zones,
                inputPlaceholder: 'Выберите необходиму зону площадки из списка',
                notFoundPlaceholder: 'Такой зоны нет',
              }),
              [zones]
            )}
          />
        </div>

        <hr />

        <FormField
          isRequired
          label="Тренер"
          id="coach"
          name="coach"
          dataTip={selectCoachesForEventHint}
          inputComponent={FormFilterDropdownWithValue}
          inputProps={useMemo(
            () => ({
              itemRenderer: ({ fio, email, phone } = {}) =>
                `${fio || ''}${email && fio ? ' - ' : ''}${email || ''}${
                  email && phone ? ' - ' : ''
                }${phone || ''}`,
              getSearchValueFromItem: item => item.fio,
              selectedItemRenderer: ({ fio, email, phone } = {}) =>
                `${fio || ''}${email && fio ? ' - ' : ''}${email || ''}${
                  email && phone ? ' - ' : ''
                }${phone || ''}`,
              menuId: 'coach_dropdown',
              items: coaches,
              inputPlaceholder: 'Выберите имя тренера из списка',
              notFoundPlaceholder: 'Такого тренера нет',
            }),
            [coaches]
          )}
        />
      </>
      <ToolTip />
    </div>
  )
}

ScheduleEditForm.defaultProps = {
  areas: [],
  zones: [],
  coaches: [],
  areaId: null,
}

ScheduleEditForm.propTypes = {
  form: PropTypes.shape({
    change: PropTypes.func,
    getFieldState: PropTypes.func,
  }).isRequired,
  areas: PropTypes.arrayOf(PropTypes.object),
  zones: PropTypes.arrayOf(PropTypes.object),
  coaches: PropTypes.arrayOf(PropTypes.object),
  fetchZones: PropTypes.func.isRequired,
  fetchDisciplines: PropTypes.func.isRequired,
  fetchFullPersons: PropTypes.func.isRequired,
  savePersonsMode: PropTypes.func.isRequired,
  selectArea: PropTypes.func.isRequired,
  areaId: PropTypes.string,
}

const mapStateToProps = state => ({
  areaId: userSelectedAreaId(state),
  areas: userAreasSelector(state),
  coaches: selectPersonsByMode(state),
  zones: userAllZones(state),
  sports: selectSports(state),
  organizationsWithContract: foundationOrganizationsWithContracts(state),
  eventTypes: eventsTypesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchZones: () => dispatch(getZones()),
  fetchSports: () => dispatch(getFullSports()),
  savePersonsMode: mode => dispatch(getPersonsMode(mode)),
  fetchDisciplines: () => dispatch(getFullDisciplines()),
  fetchFullPersons: () => dispatch(getFullPersons()),
  fetchEventTypes: () => dispatch(getEventTypes()),
  selectArea: areaId => dispatch(setAreaId(areaId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleEditForm)
