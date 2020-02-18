import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import history from 'utils/utils'

import CoachForm from 'pages/registry/organizations/components/CoachForm'
import { selectOrganizationCoachForEdit } from 'store/selectors/groups/persons'
import { getCurrentPersonById } from 'store/actionCreators/groups/persons'
import { editPerson } from 'store/actionCreators/registry/registry'

const EditCoach = ({
  getCoachForEdit,
  submit,
  coachForEdit,
  match: { params: { id } = {} } = {},
}) => {
  useEffect(() => {
    getCoachForEdit(id)
  }, [getCoachForEdit, id])

  const editPersonById = useCallback(
    formValues => {
      submit(id, formValues)
    },
    [id, submit]
  )

  return <CoachForm submit={editPersonById} coachForEdit={coachForEdit} />
}

EditCoach.propTypes = {
  submit: PropTypes.func.isRequired,
  coachForEdit: PropTypes.shape({}).isRequired,
  getCoachForEdit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

const mapStateToProps = state => ({
  coachForEdit: selectOrganizationCoachForEdit(state),
})

const mapDispatchToProps = dispatch => ({
  submit: (personId, formValues) =>
    dispatch(
      editPerson(personId, formValues, () =>
        history.push('/organizations/registry/coaches')
      )
    ),
  getCoachForEdit: id => dispatch(getCurrentPersonById(id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditCoach)
)
