import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'

import Button from 'components/button/Button'
import PageHeader from 'components/pageHeader/PageHeader'
import RoutesRenderer from 'router/RoutesRenderer'

import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'

import {
  getFullSports,
  getFacilitySports,
} from 'store/actionCreators/registry/registry'
import getAbonnementsAll from 'store/actionCreators/abonnement/abonnement'

import './Registry.scss'

const prefix = getUserWorkplaceType()

const defineAddButtonText = isCoach => {
  if (isCoach) {
    return 'Добавить тренера'
  }

  if (prefix === 'facilities') {
    return 'Добавить клиента'
  }

  return 'Добавить спортсмена'
}

const Registry = ({
  routes,
  fetchAbonnements,
  location: { pathname = '/' } = {},
  fetchSports,
}) => {
  const matchedRoute = matchRoutes(routes, pathname)
  const { headerTitle, shouldRenderHeader } = matchedRoute[0].route
  const isCoach = pathname.endsWith('coaches')

  useEffect(() => {
    fetchSports()
    fetchAbonnements()
  }, [fetchSports, fetchAbonnements])

  return (
    <>
      {!shouldRenderHeader ? null : (
        <PageHeader title={headerTitle}>
          <Button
            className="button1 add-trainer"
            icon="ic-add"
            onClick={() =>
              history.push(
                `/${prefix}/registry/${
                  isCoach ? 'coaches/coach' : 'sportsmens/sportsmen'
                }/add`
              )
            }
          >
            <span>{defineAddButtonText(isCoach)}</span>
          </Button>
        </PageHeader>
      )}
      <div className="registry-content">
        <RoutesRenderer routes={routes} />
      </div>
    </>
  )
}

Registry.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSports: PropTypes.func.isRequired,
  fetchAbonnements: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchAbonnements: () => dispatch(getAbonnementsAll()),
  fetchSports: () => {
    if (prefix === 'organizations') {
      return dispatch(
        getFullSports({ pageSize: 10000, returnDisciplines: true })
      )
    }

    return dispatch(getFacilitySports())
  },
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Registry)
)
