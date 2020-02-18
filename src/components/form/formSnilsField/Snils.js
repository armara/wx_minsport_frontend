import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-final-form'

import FormField from 'components/form/formField/FormField'
import FormInputMask from 'components/form/formInputMask/FormInputMask'
import {
  composeValidators,
  snilsValidate,
  isPersonWithSnilsExists,
} from 'components/form/validators'
import parseInputMaskValue from 'utils/parseInputMaskValue'

export const getSnilsValue = inputValue => parseInputMaskValue(inputValue)

const Snils = ({ dataTip }) => {
  const { getFieldState } = useForm()
  const state = getFieldState('snils') || {}
  const { initial } = state

  return (
    <FormField
      isRequired
      name="snils"
      label="СНИЛС"
      mask="999-999-999 99"
      placeholder="XXX-XXX-XXX XX"
      dataTip={dataTip}
      inputComponent={FormInputMask}
      validate={composeValidators([
        snilsValidate,
        isPersonWithSnilsExists({ except: [initial] }),
      ])}
    />
  )
}

Snils.defaultProps = {
  dataTip: '',
}

Snils.propTypes = {
  dataTip: PropTypes.string,
}
export default Snils
