import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { eventsTypesSelector } from 'store/selectors/events'

const FormEventTypeField = ({ eventTypes, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    name="eventType"
    label="Тип занятия / мероприятия"
    inputPlaceholder="Выберите тип занятия / мероприятия из списка"
    dataTip={dataTip}
    items={eventTypes}
  />
)

FormEventTypeField.defaultProps = {
  dataTip: '',
}

FormEventTypeField.propTypes = {
  eventTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  eventTypes: eventsTypesSelector(state),
})

export default connect(
  mapStateToProps,
  null
)(FormEventTypeField)
