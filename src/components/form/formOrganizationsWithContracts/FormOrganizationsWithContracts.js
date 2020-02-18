import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { foundationOrganizationsWithContracts } from 'store/selectors/foundation'
import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'

const FormOrganizationsWithContracts = ({ organizations, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    label="Организатор"
    name="organizationsWithContracts"
    inputPlaceholder="Выберите из списка название организации"
    dataTip={dataTip}
    items={organizations}
  />
)

FormOrganizationsWithContracts.defaultProps = {
  organizations: [],
  dataTip: '',
}

FormOrganizationsWithContracts.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.object),
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  organizations: foundationOrganizationsWithContracts(state),
})

export default connect(
  mapStateToProps,
  null
)(FormOrganizationsWithContracts)
