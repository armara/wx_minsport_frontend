import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'components/checkbox/Checkbox'

import './FormCheckbox.scss'

const FormCheckbox = ({ input: { onChange, value }, label, dataTip }) => (
  <Checkbox
    label={label}
    isSelected={!!value}
    onClick={useCallback(() => onChange(!value), [onChange, value])}
    dataTip={dataTip}
  />
)

FormCheckbox.defaultProps = {
  dataTip: '',
}

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  dataTip: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
}

export default FormCheckbox
