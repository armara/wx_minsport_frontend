import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createFacilityCoach } from 'store/actionCreators/registry/registry'
import FacilityCoachForm from 'pages/registry/facilities/components/FacilityCoachForm'

const AddCoach = ({ submit }) => (
  <FacilityCoachForm showRanks submit={submit} showPositionsFirst />
)

AddCoach.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  submit: formValues => dispatch(createFacilityCoach(formValues)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddCoach)
