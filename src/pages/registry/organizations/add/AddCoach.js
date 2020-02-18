import React from 'react'
import history from 'utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CoachForm from 'pages/registry/organizations/components/CoachForm'
import { createOrganizationPerson } from 'store/actionCreators/registry/registry'

const AddCoach = ({ submit }) => <CoachForm submit={submit} />

AddCoach.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  submit: formValues =>
    dispatch(
      createOrganizationPerson(formValues, () =>
        history.push('/organizations/registry/coaches')
      )
    ),
})

export default connect(
  null,
  mapDispatchToProps
)(AddCoach)
