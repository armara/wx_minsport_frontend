import React from 'react'
import PropTypes from 'prop-types'

import FormField from 'components/form/formField/FormField'
import DaysCheckboxes from 'pages/schedule/components/daysCheckboxes/DaysCheckboxes'

const FormDaysField = ({ isDisabled, dataTip }) => (
  <FormField
    isRequired
    name="days"
    label="Выберите дни недели"
    isDisabled={isDisabled}
    dataTip={dataTip}
    inputComponent={DaysCheckboxes}
  />
)

FormDaysField.defaultProps = {
  isDisabled: false,
  dataTip: '',
}

FormDaysField.propTypes = {
  isDisabled: PropTypes.bool,
  dataTip: PropTypes.string,
}

export default FormDaysField
