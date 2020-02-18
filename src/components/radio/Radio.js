import React from 'react'
import PropTypes from 'prop-types'

import './Radio.scss'

const Radio = ({ label, id, isSelected, onClick, name, value }) => (
  <div className="base-radio">
    <label htmlFor={id}>
      <input
        type="radio"
        id={id || `radio-${name}-${value}`}
        name={name}
        value={value}
        onClick={onClick}
        className={isSelected ? 'base-radio_selected' : ''}
      />
      <span className="base-radio_dot" />
      <div className="base-radio_label">{label}</div>
    </label>
  </div>
)

Radio.defaultProps = {
  label: null,
  id: null,
}

Radio.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
}

export default Radio
