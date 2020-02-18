import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FormFilterDropdownField from 'components/form/formFilterDropdownField/FormFilterDropdownField'
import { selectScheduleItemRepeatTypes } from 'store/selectors/schedule'

const FormRepeatTypeField = ({ repeatTypes, dataTip }) => (
  <FormFilterDropdownField
    isRequired
    name="repeatType"
    label="Периодичность"
    inputPlaceholder="Выберите периодичность из списка"
    dataTip={dataTip}
    items={repeatTypes}
  />
)

FormRepeatTypeField.defaultProps = {
  repeatTypes: [],
  dataTip: '',
}

FormRepeatTypeField.propTypes = {
  repeatTypes: PropTypes.arrayOf(PropTypes.shape({})),
  dataTip: PropTypes.string,
}

const mapStateToProps = state => ({
  repeatTypes: selectScheduleItemRepeatTypes(state),
})

export default connect(
  mapStateToProps,
  null
)(FormRepeatTypeField)
