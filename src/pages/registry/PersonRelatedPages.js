import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'

import PageHeader from 'components/pageHeader/PageHeader'
import Button from 'components/button/Button'
import BackButton from 'components/button/backButton/BackButton'
import RoutesRenderer from 'router/RoutesRenderer'

import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'

import {
  getFederationsAll,
  getFullSports,
  getRanksAll,
} from 'store/actionCreators/registry/registry'
import { getPositions } from 'store/actionCreators/groups/groups'
import { selectPersonsMode, selectSinglePerson } from 'store/selectors/registry'

import './PersonRelatedPages.scss'

const prefix = getUserWorkplaceType()
const PersonRelatedPages = ({
  routes,
  fetchFederations,
  fetchRanks,
  fetchFullSports,
  fetchPositions,
  location: {
    pathname,
    state: {
      prevLocation = `/${prefix}/registry/${
        pathname.includes('coach') ? 'coaches' : 'sportsmens'
      }`,
    } = {},
  } = {},
  singlePerson,
}) => {
  const matchedRoute = matchRoutes(routes, pathname)
  const {
    route: {
      shouldRenderHeader = true,
      shouldRenderEditButton = true,
      backButtonText,
    },
    match: {
      params: { id: personId },
    },
  } = matchedRoute[0]

  useEffect(() => {
    fetchFederations()
    fetchRanks()
    fetchPositions()
    fetchFullSports({ pageSize: 10000, returnDisciplines: true })
  }, [fetchFullSports, fetchFederations, fetchRanks, fetchPositions])

  const memoizedOnBackClick = useCallback(() => history.push(prevLocation), [
    prevLocation,
  ])

  const memoizedOnEditClick = useCallback(
    () =>
      history.push(
        `/${prefix}/registry/${
          pathname.includes('coach') ? 'coaches/coach' : 'sportsmens/sportsmen'
        }/edit/${personId}`,
        {
          prevLocation: pathname,
        }
      ),
    [personId, pathname]
  )

  return (
    <>
      {!shouldRenderHeader ? null : (
        <PageHeader>
          <>
            <BackButton
              text={backButtonText || singlePerson.fio || 'Ожидание...'}
              onClick={memoizedOnBackClick}
            />
            {!shouldRenderEditButton ? null : (
              <Button
                className="grey-button"
                size="is-small"
                onClick={memoizedOnEditClick}
              >
                <span>
                  Редактировать{' '}
                  {pathname.includes('coach') ? 'тренера' : 'спортсмена'}
                </span>
              </Button>
            )}
          </>
        </PageHeader>
      )}
      <div className="person-related-pages">
        <RoutesRenderer routes={routes} />
      </div>
    </>
  )
}

PersonRelatedPages.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  singlePerson: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchFederations: PropTypes.func.isRequired,
  fetchRanks: PropTypes.func.isRequired,
  fetchPositions: PropTypes.func.isRequired,
  fetchFullSports: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  personsMode: selectPersonsMode(state),
  singlePerson: selectSinglePerson(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFederations: () => dispatch(getFederationsAll()),
  fetchRanks: () => dispatch(getRanksAll()),
  fetchPositions: () => dispatch(getPositions()),
  fetchFullSports: () => dispatch(getFullSports({ returnDisciplines: true })),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PersonRelatedPages)
)
