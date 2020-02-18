import React from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'

const FormInputMask = ({ input: { value, onChange }, mask, placeholder }) => (
  <InputMask
    onChange={onChange}
    value={value}
    className="form-input"
    mask={mask}
    placeholder={placeholder}
  />
)

FormInputMask.propTypes = {
  mask: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
}

export default FormInputMask
