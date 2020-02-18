import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from 'components/pageHeader/PageHeader'
import Container from 'components/container/Container'
import List from 'components/list/List'
import Table from 'components/table/Table'
import Button from 'components/button/Button'
import PercentageCircles from 'components/percentageCircles/PercentageCircles'

import { getAllContracts } from 'store/actionCreators/foundation/foundation'
import { userAllZones, userAreasSelector } from 'store/selectors/user'
import { foundationContractsSelector } from 'store/selectors/foundation'
import { selectPersonsByMode } from 'store/selectors/registry'
import {
  getFullPersons,
  getPersonsMode,
} from 'store/actionCreators/registry/registry'
import { getAllZones, getAreas } from 'store/actionCreators/user/user'

import dayjs from 'utils/day'
import history from 'utils/utils'
import { getUserWorkplaceType } from 'utils/user'
import { courtsList, columns, staffList } from './mocks'

import './Dashboard.scss'

const prefix = getUserWorkplaceType()
const getTopFiveByFinishDate = contracts =>
  contracts
    .sort((a, b) => {
      return dayjs(a.finishDate) - dayjs(b.finishDate)
    })
    .slice(0, 5)

const getTopFiveByAge = coaches =>
  staffList(
    coaches
      .sort((a, b) => {
        return dayjs(b.birthDate) - dayjs(a.birthDate)
      })
      .slice(0, 5)
  )

const goToAddCoach = () => {
  history.push(`/${prefix}/registry/coaches/coach/add`, {
    prevLocation: `/${prefix}`,
  })
}

const Dashboard = ({
  contracts,
  fetchContracts,
  areas,
  zones,
  coaches,
  fetchAreas,
  fetchZones,
  fetchFullPersons,
  savePersonsMode,
}) => {
  useEffect(() => {
    fetchAreas()
    fetchZones()
    fetchContracts()
    fetchFullPersons()
    savePersonsMode('coaches')
  }, [
    fetchFullPersons,
    fetchAreas,
    fetchZones,
    fetchContracts,
    savePersonsMode,
  ])

  return (
    <div className="base-dashboard">
      <PageHeader title="Панель управления" />
      <div className="dashboard-content columns is-desktop">
        <Container title="Договоры" className="column is-half">
          <Table
            data={getTopFiveByFinishDate(contracts)}
            columns={columns}
            className="dashboard-content_contracts-table"
            loading={false}
            onRowClick={useCallback(({ original: { id } = {} }) => {
              history.push(`/${prefix}/foundations/${id}`)
            }, [])}
          />
        </Container>

        <Container title="Загрузка площадок" className="column auto">
          <List
            items={courtsList(areas, zones)}
            className="dashboard-content_courts-list"
          >
            {useCallback(
              ({ title, rating }) => (
                <div className="rating_wrapper">
                  <h4>{title}</h4>
                  <PercentageCircles
                    radius={25}
                    stroke={7}
                    progress={rating > 100 ? rating / 10 : rating}
                  />
                </div>
              ),
              []
            )}
          </List>
        </Container>
        <Container title="Тренеры" className="column auto">
          <>
            <List
              items={getTopFiveByAge(coaches)}
              className="dashboard-content_staff-list"
            >
              {useCallback(item => {
                return (
                  <Link to={`${prefix}/registry/coaches/coach/${item.id}`}>
                    <span>{item.field}</span>
                  </Link>
                )
              }, [])}
            </List>
            <Button
              className="nav-green-button dashboard-button-add"
              element="a"
              icon="ic-add"
              onClick={goToAddCoach}
            >
              <span>Добавить тренера</span>
            </Button>
          </>
        </Container>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  contracts: PropTypes.arrayOf(PropTypes.object).isRequired,
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
  zones: PropTypes.arrayOf(PropTypes.object).isRequired,
  coaches: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchContracts: PropTypes.func.isRequired,
  fetchAreas: PropTypes.func.isRequired,
  fetchZones: PropTypes.func.isRequired,
  fetchFullPersons: PropTypes.func.isRequired,
  savePersonsMode: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  contracts: foundationContractsSelector(state),
  areas: userAreasSelector(state),
  zones: userAllZones(state),
  coaches: selectPersonsByMode(state),
})

const mapDispatchToProps = dispatch => ({
  fetchFullPersons: () => dispatch(getFullPersons()),
  savePersonsMode: mode => dispatch(getPersonsMode(mode)),
  fetchAreas: () => dispatch(getAreas()),
  fetchZones: () => dispatch(getAllZones()),
  fetchContracts: () => dispatch(getAllContracts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
