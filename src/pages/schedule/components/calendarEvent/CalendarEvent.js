import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const CalendarEvent = ({ title, event }) => (
  <div
    title={`${title} ${moment.utc(event.dateTimeBegin).format('HH:mm')}`}
    className="event-title-wrap"
  >
    <span className="event-title">{title}</span>
    <span>{moment.utc(event.dateTimeBegin).format('HH:mm')}</span>
  </div>
)

CalendarEvent.propTypes = {
  title: PropTypes.string.isRequired,
  event: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default CalendarEvent
