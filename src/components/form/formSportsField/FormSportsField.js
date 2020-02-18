import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { selectSports } from 'store/selectors/registry'

const FormSportsField = ({ sports, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    label="Вид спорта"
    name="sport"
    inputPlaceholder="Выберите вид спорта из списка"
    dataTip={dataTip}
    items={sports}
  />
)

FormSportsField.defaultProps = {
  sports: [],
  dataTip: '',
}

FormSportsField.propTypes = {
  sports: PropTypes.arrayOf(PropTypes.object),
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  sports: selectSports(state),
})

export default connect(
  mapStateToProps,
  null
)(FormSportsField)
