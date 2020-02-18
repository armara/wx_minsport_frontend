import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { editFacilityClient } from 'store/actionCreators/registry/registry'
import { getCurrentPersonById } from 'store/actionCreators/groups/persons'
import { selectFacilityClientForEdit } from 'store/selectors/groups/persons'
import FacilityClientForm from 'pages/registry/facilities/components/FacilityClientForm'

const EditClient = ({
  submit,
  clientForEdit,
  getClientForEdit,
  match: { params: { id } = {} } = {},
}) => {
  useEffect(() => {
    getClientForEdit(id)
  }, [getClientForEdit, id])

  const editPersonById = useCallback(
    (formValues, formApi) => {
      submit(id, formValues, formApi)
    },
    [id, submit]
  )

  return (
    <FacilityClientForm
      submit={editPersonById}
      facilityPersonForEdit={clientForEdit}
    />
  )
}

EditClient.propTypes = {
  submit: PropTypes.func.isRequired,
  getClientForEdit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  clientForEdit: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  clientForEdit: selectFacilityClientForEdit(state),
})

const mapDispatchToProps = dispatch => ({
  submit: (personId, formValues, formApi) =>
    dispatch(editFacilityClient(personId, formValues, formApi)),
  getClientForEdit: id => dispatch(getCurrentPersonById(id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditClient)
)
