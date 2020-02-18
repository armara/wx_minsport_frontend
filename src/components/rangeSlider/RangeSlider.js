import React from 'react'
import PropTypes from 'prop-types'
import { createSliderWithTooltip, Range as NativeRange } from 'rc-slider'

import pluralizeWord from 'utils/pluralizeWord'

import 'rc-slider/assets/index.css'
import './RangeSlider.scss'

const Range = createSliderWithTooltip(NativeRange)

const formatTip = value => {
  return `${value} ${pluralizeWord(value, ['года', 'лет', 'лет'])}`
}

const RangeSlider = ({
  value,
  onChange,
  defaultValue,
  min,
  max,
  allowCross,
}) => {
  return (
    <Range
      allowCross={allowCross}
      min={min}
      max={max}
      defaultValue={defaultValue}
      value={value}
      tipFormatter={formatTip}
      onChange={onChange}
    />
  )
}

RangeSlider.defaultProps = {
  allowCross: false,
  min: 0,
  max: 80,
  defaultValue: [3, 20],
}

RangeSlider.propTypes = {
  allowCross: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RangeSlider
