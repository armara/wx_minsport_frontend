import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import PropTypes from 'prop-types'

import PageHeader from 'components/pageHeader/PageHeader'
import AddFoundationButton from 'pages/foundations/components/addFoundationButton/AddFoundationButton'
import Button from 'components/button/Button'
import RoutesRenderer from 'router/RoutesRenderer'
import Modal from 'components/modal/Modal'

import history from 'utils/utils'
import {
  setModal,
  setCurrentContract,
} from 'store/actions/foundation/foundation'
import { deleteContractBy } from 'store/actionCreators/foundation/foundation'
import {
  foundationCurrentContractSelector,
  foundationIsModalOpenSelector,
} from 'store/selectors/foundation'
import { facilitiesPrefix as prefix } from 'utils/auth'

import './Foundations.scss'

const clearContract = {
  organizationName: '',
  zoneTitle: '',
  zones: [],
  files: [
    {
      key: 0,
      name: '',
    },
  ],
  id: '',
}

const Foundations = ({
  routes,
  location: { pathname = '/' } = {},
  currentContract,
  isModalOpen,
  setModalState,
  setContract,
  deleteContract,
}) => {
  const matchedRoute = matchRoutes(routes, pathname)
  const { shouldShowAddButton, shouldShowEditButton } = matchedRoute[0].route

  return (
    <>
      <PageHeader title="Перечень договоров">
        <>
          {shouldShowAddButton && <AddFoundationButton />}
          {shouldShowEditButton && (
            <Button
              className="grey-button"
              size="is-small"
              onClick={() =>
                history.push(
                  `/${prefix}/foundations/edit/${currentContract.id}`
                )
              }
            >
              <span>Редактировать данные</span>
            </Button>
          )}
        </>
      </PageHeader>

      <Modal
        isOpen={isModalOpen}
        onCancel={() => {
          setModalState(false)
          setContract(clearContract)
        }}
        onOk={useCallback(() => {
          deleteContract(currentContract.id, () =>
            history.push(`/${prefix}/foundations`)
          )
        }, [currentContract.id, deleteContract])}
        text="Удалить договор?"
        okText="Да"
        cancelText="Не удалять"
      />

      <div className="foundations-content">
        <RoutesRenderer routes={routes} />
      </div>
    </>
  )
}

Foundations.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  currentContract: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  setContract: PropTypes.func.isRequired,
  deleteContract: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isModalOpen: foundationIsModalOpenSelector(state),
  currentContract: foundationCurrentContractSelector(state),
})

const mapDispatchToProps = dispatch => ({
  setModalState: isOpen => dispatch(setModal(isOpen)),
  setContract: contract => dispatch(setCurrentContract(contract)),
  deleteContract: (coachId, callback) =>
    dispatch(deleteContractBy(coachId, callback)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Foundations)
)
