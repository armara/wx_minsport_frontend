import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import RoutesRenderer from 'router/RoutesRenderer'

import PageHeader from 'components/pageHeader/PageHeader'
import Button from 'components/button/Button'

import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'

import { initMonthSchedules } from 'store/actionCreators/schedule/schedule'

const prefix = getUserWorkplaceType()

const Schedule = ({
  location: { pathname = '/' } = {},
  routes,
  onInitMonthSchedules,
}) => {
  const matchedRoute = matchRoutes(routes, pathname)
  const { shouldShowAddButtons = true } = matchedRoute[0].route

  useEffect(() => {
    onInitMonthSchedules()
  }, [onInitMonthSchedules])

  return (
    <>
      <PageHeader title="Расписание занятий и мероприятий ФОКа">
        <>
          {shouldShowAddButtons && (
            <Button
              className="btn-add-event"
              size="is-small"
              element="a"
              icon="ic-plus-yellow"
              onClick={() => {
                history.push(`/${prefix}/schedule/event/add`)
              }}
            >
              <span>Добавить мероприятие</span>
            </Button>
          )}
        </>
      </PageHeader>
      <div className="schedule-content">
        <RoutesRenderer routes={routes} />
      </div>
    </>
  )
}

Schedule.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInitMonthSchedules: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const mapDispatchToProps = dispatch => ({
  onInitMonthSchedules: () => dispatch(initMonthSchedules()),
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Schedule)
)
