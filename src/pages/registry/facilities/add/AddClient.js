import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FacilityClientForm from 'pages/registry/facilities/components/FacilityClientForm'
import { createFacilityClient } from 'store/actionCreators/registry/registry'

const AddClient = ({ submit }) => <FacilityClientForm submit={submit} />

AddClient.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  submit: formValues => dispatch(createFacilityClient(formValues)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddClient)
