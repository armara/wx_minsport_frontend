import React from 'react'
import PropTypes from 'prop-types'

import TimePicker from 'components/timePicker/TimePicker'

import './FormTimePicker.scss'

const FormTimePicker = ({ input: { value, name, onChange }, placeholder }) => (
  <div className="form-time-picker">
    <TimePicker
      value={value}
      onChange={onChange}
      onSelect={onChange}
      menuId={`${name}MenuId`}
      placeholder={placeholder}
    />
  </div>
)

FormTimePicker.defaultProps = {
  placeholder: '',
}

FormTimePicker.propTypes = {
  placeholder: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({}).isRequired,
}

export default FormTimePicker
