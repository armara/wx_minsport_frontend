/* eslint-disable react/no-unused-prop-types, react/jsx-props-no-spreading, react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Field } from 'react-final-form'

import Input from 'components/input/Input'
import { composeValidators, mustBeNotNull } from 'components/form/validators'
import ToolTipIcon from 'components/toolTip/icon/ToolTipIcon'

import 'components/form/formField/FormField.scss'

const renderError = (items, name) => {
  const { error, modified, touched } = items.meta

  const nestedError = (error || {})[name]
  const errorMessage = nestedError || error
  return (
    errorMessage &&
    (modified || touched) && <p title={errorMessage}>{errorMessage}</p>
  )
}

const getValidators = (validate, isRequired) =>
  isRequired ? composeValidators([mustBeNotNull, validate]) : validate

const defineIfRequired = (isRequired, isDisabled) => {
  if (isDisabled) return false
  return isRequired
}

const getValidatorsIfDefined = (validate, required) => {
  if (typeof validate === 'function') {
    return {
      validate: getValidators(validate, required),
    }
  }

  if (required) {
    return {
      validate: mustBeNotNull,
    }
  }

  return null
}

const getValidateFieldsIfDefined = validateFields => {
  if (validateFields === null) {
    return null
  }

  return {
    validateFields,
  }
}

const defineIfWithError = (validators, required) => {
  return validators !== null || required
}

const defineErrorRenderer = customErrorRenderer => {
  if (typeof customErrorRenderer === 'function') {
    return customErrorRenderer
  }

  return renderError
}

const FormField = props => {
  const {
    label,
    isDisabled,
    className,
    name,
    inputComponent: InputComponent,
    inputProps,
    validateFields,
    validate,
    renderError: customErrorRenderer,
    isRequired,
    accept,
    dataTip,
    ...rest
  } = props

  const required = defineIfRequired(isRequired, isDisabled)
  const validateIfDefined = getValidatorsIfDefined(validate, required)
  const validateFieldsIfDefined = getValidateFieldsIfDefined(validateFields)
  const withError = defineIfWithError(validateIfDefined, required)
  const errorRenderer = defineErrorRenderer(customErrorRenderer)

  return (
    <div
      className={classnames([
        className,
        'form-field',
        isDisabled ? 'form-field_disabled' : '',
      ])}
    >
      {label && (
        <label htmlFor={name}>
          <span
            className={classnames([
              className,
              required ? 'form-field_required' : '',
            ])}
          >
            {label}
          </span>
          {dataTip && <ToolTipIcon dataTip={dataTip} />}
        </label>
      )}
      {InputComponent ? (
        <Field
          id={name}
          name={name}
          {...validateIfDefined}
          {...validateFieldsIfDefined}
        >
          {items => (
            <div className={withError ? 'form-field_with-error' : ''}>
              <InputComponent
                name={name}
                {...inputProps}
                {...items}
                {...rest}
                disabled={isDisabled}
                accept={accept}
              />
              {withError && errorRenderer(items, name)}
            </div>
          )}
        </Field>
      ) : (
        <Field
          id={name}
          name={name}
          {...validateIfDefined}
          {...validateFieldsIfDefined}
        >
          {items => (
            <div className={withError ? 'form-field_with-error' : ''}>
              <Input
                className="form-input"
                {...inputProps}
                {...items.input}
                {...rest}
                disabled={isDisabled}
              />
              {withError && errorRenderer(items, name)}
            </div>
          )}
        </Field>
      )}
    </div>
  )
}

FormField.defaultProps = {
  className: '',
  label: '',
  inputComponent: null,
  isRequired: false,
  isDisabled: false,
  validate: null,
  validateFields: [],
  renderError: null,
  accept: null,
  dataTip: 'Важно',
}

FormField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  renderError: PropTypes.func,
  inputComponent: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.element,
    PropTypes.func,
  ]),
  validate: PropTypes.func,
  validateFields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  accept: PropTypes.string,
  dataTip: PropTypes.string,
}

export default FormField
