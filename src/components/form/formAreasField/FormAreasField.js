import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { userAreasSelectorWithTitleKey } from 'store/selectors/user'

const FormAreasField = ({ areas, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    name="area"
    label="Площадка"
    inputPlaceholder="Выберите площадку из списка"
    dataTip={dataTip}
    items={areas}
  />
)

FormAreasField.defaultProps = {
  dataTip: '',
}

FormAreasField.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  areas: userAreasSelectorWithTitleKey(state),
})

export default connect(
  mapStateToProps,
  null
)(FormAreasField)
