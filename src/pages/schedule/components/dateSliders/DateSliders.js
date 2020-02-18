import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from 'components/button/Button'
import { changeMonth, changeWeek } from 'store/actionCreators/schedule/schedule'
import { selectCurrentDate } from 'store/selectors/schedule'

import {
  monthLabel,
  weekLabel,
} from 'pages/schedule/components/dateSliders/dateLabels'

import './DateSliders.scss'

const DateSliders = ({
  view,
  currentDate,
  handleNextMonth,
  handlePrevMonth,
  handleNextWeek,
  handlePrevWeek,
}) => {
  return (
    <>
      <div className="moth-slider">
        <Button
          className="btn-prev"
          size="is-small"
          element="a"
          icon="ic-arrow-back"
          onClick={handlePrevMonth}
        />
        <h5>{monthLabel(currentDate)}</h5>
        <Button
          className="btn-next"
          size="is-small"
          element="a"
          icon="ic-arrow-forward"
          onClick={handleNextMonth}
        />
      </div>
      {view === 'week' && (
        <div className="week-slider">
          <Button
            className="btn-prev"
            size="is-small"
            element="a"
            icon="ic-arrow-back"
            onClick={handlePrevWeek}
          />
          <h5>{weekLabel(currentDate)}</h5>
          <Button
            className="btn-next"
            size="is-small"
            element="a"
            icon="ic-arrow-forward"
            onClick={handleNextWeek}
          />
        </div>
      )}
    </>
  )
}

DateSliders.propTypes = {
  view: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  handleNextMonth: PropTypes.func.isRequired,
  handlePrevMonth: PropTypes.func.isRequired,
  handleNextWeek: PropTypes.func.isRequired,
  handlePrevWeek: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentDate: selectCurrentDate(state),
})

const mapDispatchToProps = dispatch => ({
  handleNextMonth: () => dispatch(changeMonth(1)),
  handlePrevMonth: () => dispatch(changeMonth(-1)),
  handleNextWeek: () => dispatch(changeWeek(1)),
  handlePrevWeek: () => dispatch(changeWeek(-1)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSliders)
