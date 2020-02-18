import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import toolbarLinks from './toolbarLinks'

const ScheduleToolbar = ({ className, view }) => (
  <div className={classnames([className, 'schedule-toolbar'])}>
    {toolbarLinks.map(link => {
      return (
        <Link
          className={classnames('schedule-toolbar-link', {
            active: link.shows.match(view),
          })}
          key={link.id}
          to={link.href}
        >
          {link.label}
        </Link>
      )
    })}
  </div>
)

ScheduleToolbar.defaultProps = {
  className: '',
}

ScheduleToolbar.propTypes = {
  className: PropTypes.string,
  view: PropTypes.string.isRequired,
}

export default ScheduleToolbar
