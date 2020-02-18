import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from 'components/modal/Modal'
import RoutesRenderer from 'router/RoutesRenderer'

import { getUserWorkplaceType, getUserWorkplaceId } from 'utils/user'

import {
  getFullSports,
  getFacilitySports,
} from 'store/actionCreators/registry/registry'
import { getOrganizationContracts } from 'store/actionCreators/foundation/foundation'

const prefix = getUserWorkplaceType()
const workplaceId = getUserWorkplaceId()

const Groups = ({ routes, fetchSports, fetchOrganizationContracts }) => {
  const [shouldShowNoContractsModal, setNoContractsModalState] = useState(false)

  useEffect(() => {
    fetchSports()
  }, [fetchSports])

  useEffect(() => {
    if (prefix === 'organizations') {
      fetchOrganizationContracts(workplaceId, fetchedContracts => {
        if (fetchedContracts.length === 0) {
          setNoContractsModalState(true)
        }
      })
    }
  }, [fetchOrganizationContracts])

  return (
    <>
      <RoutesRenderer routes={routes} />
      <Modal
        withCancel={false}
        isOpen={shouldShowNoContractsModal}
        onOk={() => setNoContractsModalState(false)}
        text="ВНИМАНИЕ!!! У вас не получится создать группу! У организации ещё нет договоров с ФОКами."
        okText="Понятно"
      />
    </>
  )
}

Groups.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSports: PropTypes.func.isRequired,
  fetchOrganizationContracts: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  fetchSports: () => {
    // Since then every man for himself
    if (prefix === 'facilities') {
      dispatch(getFacilitySports())
    } else {
      dispatch(getFullSports({ pageSize: 10000, returnDisciplines: true }))
    }
  },
  fetchOrganizationContracts: (orgId, callback) =>
    dispatch(getOrganizationContracts(orgId, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups)
