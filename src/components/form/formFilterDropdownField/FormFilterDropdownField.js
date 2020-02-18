import React from 'react'

import FormField from 'components/form/formField/FormField'
import FormFilterDropdownWithValue from 'components/form/formFilterDropdownWithValue/FormFilterDropdownWithValue'

const FormFilterDropdownField = props => (
  <FormField inputComponent={FormFilterDropdownWithValue} {...props} />
)

export default FormFilterDropdownField
