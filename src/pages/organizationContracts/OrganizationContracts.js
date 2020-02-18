import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUserWorkplaceId } from 'utils/user'
import RoutesRenderer from 'router/RoutesRenderer'

import PageHeader from 'components/pageHeader/PageHeader'

import { getAllFacilities as getAllFacilitiesAction } from 'store/actionCreators/user/user'
import {
  getAllContractTypes as getAllContractTypesAction,
  getOrganizationContracts as getOrganizationContractsAction,
} from 'store/actionCreators/foundation/foundation'

const organizationId = getUserWorkplaceId()

const OrganizationContracts = ({
  routes,
  fetchOrganizationContracts,
  fetchAllFacilities,
  fetchContractTypes,
}) => {
  useEffect(() => {
    fetchAllFacilities()
    fetchContractTypes()
    fetchOrganizationContracts()
  }, [fetchAllFacilities, fetchContractTypes, fetchOrganizationContracts])

  return (
    <>
      <PageHeader title="Договоры с ФОКами" />
      <RoutesRenderer routes={routes} />
    </>
  )
}

OrganizationContracts.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchOrganizationContracts: PropTypes.func.isRequired,
  fetchAllFacilities: PropTypes.func.isRequired,
  fetchContractTypes: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchOrganizationContracts: () =>
    dispatch(getOrganizationContractsAction(organizationId)),
  fetchAllFacilities: () => dispatch(getAllFacilitiesAction()),
  fetchContractTypes: () => dispatch(getAllContractTypesAction()),
})

export default connect(
  null,
  mapDispatchToProps
)(OrganizationContracts)
