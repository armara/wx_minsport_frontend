import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { userAllFacilitiesSelector } from 'store/selectors/user'

const FormFacilityField = ({ facilities, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    label="ФОК проведения мероприятия"
    titleKey="name"
    name="facility"
    inputPlaceholder="Выберите ФОК для проведения занятия"
    dataTip={dataTip}
    items={facilities}
  />
)

FormFacilityField.defaultProps = {
  facilities: [],
  dataTip: '',
}

FormFacilityField.propTypes = {
  facilities: PropTypes.arrayOf(PropTypes.object),
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  facilities: userAllFacilitiesSelector(state),
})

export default connect(
  mapStateToProps,
  null
)(FormFacilityField)
