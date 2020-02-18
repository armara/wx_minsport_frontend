import React from 'react'
import PropTypes from 'prop-types'

import pluralizeWord from 'utils/pluralizeWord'
import Slider from 'components/slider/Slider'

import './FormCustomSlider.scss'

const MONTHS_IN_YEAR = 12

const tipFormatter = value => {
  const years = Math.floor(value / MONTHS_IN_YEAR)
  const months = value % MONTHS_IN_YEAR

  const yearsDatePart =
    years > 0 ? `${years} ${pluralizeWord(years, ['год', 'года', 'лет'])}` : ''
  const monthsDatePart =
    months > 0
      ? `${months} ${pluralizeWord(months, ['месяц', 'месяца', 'месяцев'])}`
      : ''

  return !yearsDatePart && !monthsDatePart
    ? 'без опыта'
    : `${yearsDatePart} ${monthsDatePart}`
}

const FormCustomSlider = ({ input: { value, onChange }, ...rest }) => {
  return (
    <div className="form-custom-slider">
      <div className="form-custom-slider_tooltip">
        Стаж: {tipFormatter(value)}
      </div>
      <Slider
        onChange={onChange}
        value={parseInt(value, 10)}
        tipFormatter={tipFormatter}
        {...rest}
      />
    </div>
  )
}

FormCustomSlider.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
}

export default FormCustomSlider
