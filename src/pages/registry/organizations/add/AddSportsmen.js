import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import history from 'utils/utils'

import SportsmenForm from 'pages/registry/organizations/components/SportsmenForm'
import { createOrganizationPerson } from 'store/actionCreators/registry/registry'

const AddSportsmen = ({ submit }) => <SportsmenForm submit={submit} />

AddSportsmen.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  submit: formValues =>
    dispatch(
      createOrganizationPerson(formValues, () =>
        history.push('/organizations/registry/sportsmens')
      )
    ),
})

export default connect(
  null,
  mapDispatchToProps
)(AddSportsmen)
