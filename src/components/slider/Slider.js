import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const SliderWithTooltip = createSliderWithTooltip(Slider)

const CustomSlider = ({
  min,
  max,
  defaultValue,
  value,
  onChange,
  tipFormatter,
}) => {
  return (
    <SliderWithTooltip
      min={min}
      max={max}
      defaultValue={defaultValue}
      tipFormatter={tipFormatter}
      value={value}
      onChange={onChange}
    />
  )
}

CustomSlider.defaultProps = {
  min: 0,
  max: 480,
  defaultValue: 3,
}

CustomSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  tipFormatter: PropTypes.func.isRequired,
}

export default CustomSlider
