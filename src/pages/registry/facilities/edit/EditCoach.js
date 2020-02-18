import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { editFacilityCoach } from 'store/actionCreators/registry/registry'
import { getCurrentPersonById } from 'store/actionCreators/groups/persons'
import { selectFacilityCoachForEdit } from 'store/selectors/groups/persons'
import FacilityCoachForm from 'pages/registry/facilities/components/FacilityCoachForm'

const EditCoach = ({
  getCoachForEdit,
  coachForEdit,
  submit,
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

  return (
    <FacilityCoachForm
      showRanks
      showPositionsFirst
      facilityPersonForEdit={coachForEdit}
      submit={editPersonById}
    />
  )
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
  coachForEdit: selectFacilityCoachForEdit(state),
})

const mapDispatchToProps = dispatch => ({
  getCoachForEdit: id => dispatch(getCurrentPersonById(id)),
  submit: (personId, formValues) =>
    dispatch(editFacilityCoach(personId, formValues)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditCoach)
)
