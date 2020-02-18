import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ScheduleContainer from 'pages/schedule/components/scheduleContainer/ScheduleContainer'

import './Month.scss'

const Month = ({ className }) => (
  <div className={classnames([className, 'schedule-month'])}>
    <ScheduleContainer view="month" />
  </div>
)

Month.defaultProps = {
  className: '',
}

Month.propTypes = {
  className: PropTypes.string,
}

export default Month
