import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'components/timeStat/TimeStat.scss'

const TimeStat = ({
  isSelected,
  timeDescription,
  time,
  editorImage,
  editorName,
}) => (
  <div
    className={classnames([
      'time-stat',
      isSelected ? 'time-stat_selected' : '',
    ])}
  >
    {isSelected ? (
      <i className="ic-today-selected" />
    ) : (
      <i className="ic-calendar" />
    )}

    <span className={classnames([isSelected ? 'selected' : ''])}>
      <span>{timeDescription}: </span>
      <span>{time}</span>
    </span>

    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <img src={editorImage} alt="editor profile" />

    <p>{editorName}</p>
  </div>
)

TimeStat.defaultProps = {
  isSelected: false,
  timeDescription: '',
  time: '',
}

TimeStat.propTypes = {
  isSelected: PropTypes.bool,
  editorImage: PropTypes.string.isRequired,
  editorName: PropTypes.string.isRequired,
  timeDescription: PropTypes.string,
  time: PropTypes.string,
}

export default TimeStat
