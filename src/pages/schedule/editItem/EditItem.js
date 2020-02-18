import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import BackButton from 'components/button/backButton/BackButton'
import ScheduleEditForm from 'pages/schedule/components/scheduleEditForm/ScheduleEditForm'
import Form from 'components/form/Form'
import Container from 'components/container/Container'
import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'

import dayjs from 'utils/day'
import history from 'utils/utils'
import { facilitiesPrefix as prefix } from 'utils/auth'
import { getUserWorkplaceId } from 'utils/user'
import { TIME_FORMAT } from 'utils/localization'

import {
  editScheduleItem,
  getScheduleItemForEditById,
} from 'store/actionCreators/schedule/schedule'
import {
  scheduleItemSelector,
  humanizedScheduleItemForEditSelector,
} from 'store/selectors/schedule'
import {
  getAllZones,
  getAreas,
  getFacility,
} from 'store/actionCreators/user/user'
import { userAreasSelector } from 'store/selectors/user'

import './EditItem.scss'

const facilityId = getUserWorkplaceId()

const validate = () => {}

const onSubmit = (form, editEvent) => {
  const { coach, fromTime, toTime, zone, id } = form

  const body = {
    dateTimeBegin: dayjs(fromTime, TIME_FORMAT).valueOf(),
    dateTimeEnd: dayjs(toTime, TIME_FORMAT).valueOf(),
    reason: '',
    coaches: !coach ? [] : [coach.id],
    zones: [zone.id],
  }

  editEvent(body, id, () => window.location.assign(`/${prefix}/schedule`))
}

const EditItem = ({
  editEvent,
  areas,
  fetchFacility,
  fetchAllZones,
  fetchAreas,
  scheduleForEdit,
  fetchScheduleItemForEdit,
  match: { params: { id } = {} } = {},
}) => {
  useEffect(() => {
    fetchFacility()
    fetchAllZones()
    fetchAreas()
    fetchScheduleItemForEdit(id)
  }, [id, fetchScheduleItemForEdit, fetchFacility, fetchAreas, fetchAllZones])

  const memoizedOnSubmit = useCallback(form => onSubmit(form, editEvent), [
    editEvent,
  ])
  const memoizedInitialValues = useMemo(() => {
    const { zone: { areaId: scheduleItemZoneAreaId } = {} } = scheduleForEdit
    const fieldName = areas.find(
      ({ id: _areaId }) => _areaId === scheduleItemZoneAreaId
    )

    return {
      ...scheduleForEdit,
      fieldName,
    }
  }, [scheduleForEdit, areas])

  return (
    <div className="add-schedule-item">
      <BackButton text="Изменить занятие / мероприятие" />
      <hr />
      <Form
        validate={validate}
        onSubmit={memoizedOnSubmit}
        initialValues={memoizedInitialValues}
      >
        {useCallback(({ form }) => {
          return (
            <>
              <div className="add-schedule-item_form-fields">
                <Container title="Измените необходимые поля">
                  <ScheduleEditForm form={form} />
                </Container>
              </div>

              <FormControlButtons
                cancelText="Отмена"
                successText="Изменить"
                successType="submit"
                onCancelClick={() => history.push(`/${prefix}/schedule`)}
              />
            </>
          )
        }, [])}
      </Form>
    </div>
  )
}

EditItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
  editEvent: PropTypes.func.isRequired,
  fetchAreas: PropTypes.func.isRequired,
  fetchFacility: PropTypes.func.isRequired,
  fetchAllZones: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
  fetchScheduleItemForEdit: PropTypes.func.isRequired,
  scheduleForEdit: PropTypes.shape({
    zones: PropTypes.arrayOf(PropTypes.string),
    coaches: PropTypes.arrayOf(PropTypes.string),
    dateTimeBegin: PropTypes.number,
    dateTimeEnd: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  event: scheduleItemSelector(state),
  areas: userAreasSelector(state),
  scheduleForEdit: humanizedScheduleItemForEditSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAreas: () => dispatch(getAreas()),
  fetchAllZones: () => dispatch(getAllZones()),
  editEvent: (body, id, callback) =>
    dispatch(editScheduleItem(body, id, callback)),
  fetchFacility: () => dispatch(getFacility(facilityId)),
  fetchScheduleItemForEdit: id => dispatch(getScheduleItemForEditById(id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditItem)
)
