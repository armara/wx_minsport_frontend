import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { userZonesWithTitleKey } from 'store/selectors/user'

const FormZonesField = ({ zones, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    label="Зона"
    name="zone"
    inputPlaceholder="Выберите необходиму зону площадки из списка"
    dataTip={dataTip}
    items={zones}
  />
)

FormZonesField.defaultProps = {
  zones: [],
  dataTip: '',
}

FormZonesField.propTypes = {
  zones: PropTypes.arrayOf(PropTypes.object),
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  zones: userZonesWithTitleKey(state),
})

export default connect(
  mapStateToProps,
  null
)(FormZonesField)
