import React from 'react'
import PropTypes from 'prop-types'

import pluralizeWord from 'utils/pluralizeWord'
import RangeSlider from 'components/rangeSlider/RangeSlider'

const renderMin = value => {
  const age = Math.min.apply(null, value)
  const ageTip = pluralizeWord(age, ['года', 'лет', 'лет'])

  return <p>{`От ${age} ${ageTip}`}</p>
}

const renderMax = value => {
  const age = Math.max.apply(null, value)
  const ageTip = pluralizeWord(age, ['года', 'лет', 'лет'])

  return <p>{`До ${age} ${ageTip}`}</p>
}

const briefStyleObject = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
}

const FormRangeSlider = ({ input: { value, onChange }, label }) => (
  <>
    <div style={briefStyleObject}>
      {renderMin(value)}
      {renderMax(value)}
    </div>
    <RangeSlider onChange={onChange} value={value} label={label} />
  </>
)

FormRangeSlider.defaultProps = {
  label: '',
}

FormRangeSlider.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
}

export default FormRangeSlider
