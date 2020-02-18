import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dayjs from 'utils/day'

import FormField from 'components/form/formField/FormField'
import FormFilterDropdownWithValue from 'components/form/formFilterDropdownWithValue/FormFilterDropdownWithValue'

import { selectAbonnementsAll } from 'store/selectors/abonnement'

export const composeAbonnements = abonnement => {
  if (!abonnement) {
    return null
  }

  const { id, visits, period } = abonnement

  const dateFrom = dayjs().valueOf()
  const dateTo = dateFrom + period

  return [
    {
      id,
      visits,
      dateFrom,
      dateTo,
    },
  ]
}

const FormAbonnementField = ({ abonnements, dataTip = '' }) => (
  <FormField
    isRequired
    name="abonnement"
    label="Абонемент"
    items={abonnements}
    inputComponent={FormFilterDropdownWithValue}
    inputPlaceholder="Выберите абонемент из списка"
    dataTip={dataTip}
  />
)

FormAbonnementField.propTypes = {
  abonnements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  dataTip: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  abonnements: selectAbonnementsAll(state),
})

export default connect(
  mapStateToProps,
  null
)(FormAbonnementField)
