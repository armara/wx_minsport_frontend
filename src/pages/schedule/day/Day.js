import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ScheduleContainer from 'pages/schedule/components/scheduleContainer/ScheduleContainer'

import './Day.scss'

const Day = ({ className }) => (
  <div className={classnames([className, 'schedule-day'])}>
    <ScheduleContainer view="day" />
  </div>
)

Day.defaultProps = {
  className: '',
}

Day.propTypes = {
  className: PropTypes.string,
}

export default Day
