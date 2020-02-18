import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { selectFederationsAllWithTitleField } from 'store/selectors/registry'

export const getFederationId = (federation = {}) => federation.id || null

const Federations = ({ federations, dataTip }) => (
  <FormFilterDropdownField
    name="federation"
    label="Федерация"
    inputPlaceholder="Введите название федерации"
    dataTip={dataTip}
    items={federations}
  />
)

Federations.propTypes = {
  federations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  dataTip: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  federations: selectFederationsAllWithTitleField(state),
})

export default connect(
  mapStateToProps,
  null
)(Federations)
