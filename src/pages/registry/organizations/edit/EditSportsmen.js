import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import history from 'utils/utils'

import SportsmenForm from 'pages/registry/organizations/components/SportsmenForm'
import { selectOrganizationSportsmenForEdit } from 'store/selectors/groups/persons'
import { getCurrentPersonById } from 'store/actionCreators/groups/persons'
import { editPerson } from 'store/actionCreators/registry/registry'

const EditSportsmen = ({
  submit,
  sportsmenForEdit,
  getSportsmenForEdit,
  match: { params: { id } = {} } = {},
}) => {
  useEffect(() => {
    getSportsmenForEdit(id)
  }, [getSportsmenForEdit, id])

  const editPersonById = useCallback(
    formValues => {
      submit(id, formValues)
    },
    [id, submit]
  )

  return (
    <SportsmenForm
      submit={editPersonById}
      sportsmenForEdit={sportsmenForEdit}
    />
  )
}

EditSportsmen.propTypes = {
  submit: PropTypes.func.isRequired,
  sportsmenForEdit: PropTypes.shape({}).isRequired,
  getSportsmenForEdit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

const mapStateToProps = state => ({
  sportsmenForEdit: selectOrganizationSportsmenForEdit(state),
})

const mapDispatchToProps = dispatch => ({
  getSportsmenForEdit: id => dispatch(getCurrentPersonById(id)),
  submit: (personId, formValues) =>
    dispatch(
      editPerson(personId, formValues, () =>
        history.push('/organizations/registry/sportsmens')
      )
    ),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditSportsmen)
)
