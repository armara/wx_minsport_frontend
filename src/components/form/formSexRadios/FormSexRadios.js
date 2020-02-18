import React from 'react'
import PropTypes from 'prop-types'

import Radio from 'components/radio/Radio'

const male = 'MALE'
const female = 'FEMALE'

const FormSexRadios = ({ input: { onChange, value } }) => {
  const handleClick = gender => () => onChange(gender)

  return (
    <>
      <Radio
        name="male"
        value={male}
        label="Мужской"
        isSelected={value === male}
        onClick={handleClick(male)}
      />
      <Radio
        name="female"
        value={female}
        label="Женский"
        isSelected={value === female}
        onClick={handleClick(female)}
      />
    </>
  )
}

FormSexRadios.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
}

export default FormSexRadios
