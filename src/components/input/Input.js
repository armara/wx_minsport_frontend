/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'components/input/Input.scss'

const Input = forwardRef(
  (
    { type, placeholder, value, onChange, className, input, disabled, ...rest },
    ref
  ) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
      disabled={disabled}
      className={classnames([className, 'base-input', 'input'])}
      {...input}
      {...rest}
    />
  )
)

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  className: '',
  input: {},
  disabled: false,
}

Input.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'checkbox', 'time']),
  input: PropTypes.shape({}),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
}

export default Input
