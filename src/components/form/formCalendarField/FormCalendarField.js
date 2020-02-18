import React from 'react'
import PropTypes from 'prop-types'

import FormField from 'components/form/formField/FormField'
import CalendarInput from 'components/calendarInput/CalendarInput'

const FormCalendarField = ({
  placeholder,
  isRequired,
  name,
  label,
  dataTip,
}) => (
  <FormField
    inputComponent={CalendarInput}
    inputProps={{ placeholder }}
    isRequired={isRequired}
    name={name}
    label={label}
    dataTip={dataTip}
  />
)

FormCalendarField.defaultProps = {
  isRequired: false,
  dataTip: '',
}

FormCalendarField.propTypes = {
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  dataTip: PropTypes.string,
}

export default FormCalendarField
