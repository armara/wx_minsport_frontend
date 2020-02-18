import React from 'react'
import PropTypes from 'prop-types'

import './PercentageCircles.scss'

const getColor = value => {
  // TODO: remove this, and refactor to a good color getting
  if (value <= 25) {
    return 'rgb(215,0,215)'
  }
  if (value <= 60) {
    return 'rgb(0,215,0)'
  }

  return 'rgb(215,0,0)'
}

const PercentageCircles = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const color = getColor(progress)

  return (
    <div className="circles_wrapper">
      <h5 className="progress-text">{progress}%</h5>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgba(0,0,0,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  )
}

PercentageCircles.propTypes = {
  radius: PropTypes.number.isRequired,
  stroke: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
}

export default PercentageCircles
