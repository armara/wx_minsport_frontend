import React from 'react'
import PropTypes from 'prop-types'

import Radio from 'components/radio/Radio'

const FormRadio = ({
  input: { onChange, value },
  value: radioValue,
  name,
  id,
  ...rest
}) => {
  return (
    <Radio
      onClick={onChange}
      isSelected={value}
      name={name}
      value={radioValue}
      id={id}
      {...rest}
    />
  )
}

FormRadio.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default FormRadio
