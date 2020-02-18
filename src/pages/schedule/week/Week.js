import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ScheduleContainer from 'pages/schedule/components/scheduleContainer/ScheduleContainer'

import './Week.scss'

const Week = ({ className }) => (
  <div className={classnames([className, 'schedule-week'])}>
    <ScheduleContainer view="week" />
  </div>
)

Week.defaultProps = {
  className: '',
}

Week.propTypes = {
  className: PropTypes.string,
}

export default Week
