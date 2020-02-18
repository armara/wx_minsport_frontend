import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Form as FinalForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'

import 'components/form/Form.scss'

const Form = ({
  validate,
  onSubmit,
  decorators,
  initialValues,
  subscription,
  className,
  children,
  childrenProps,
  ...rest
}) => (
  <FinalForm
    onSubmit={onSubmit}
    validate={validate}
    decorators={decorators}
    initialValues={initialValues}
    mutators={{
      ...arrayMutators,
    }}
  >
    {({ handleSubmit, form }) => {
      return (
        <form
          onSubmit={handleSubmit}
          className={classnames([className, 'base-form'])}
        >
          {typeof children === 'function'
            ? children({ form, initialValues, ...childrenProps, ...rest })
            : children}
        </form>
      )
    }}
  </FinalForm>
)

Form.defaultProps = {
  className: '',
  initialValues: {},
  childrenProps: {},
  subscription: {},
  decorators: [],
  validate: () => {},
}

Form.propTypes = {
  decorators: PropTypes.arrayOf(PropTypes.func),
  subscription: PropTypes.shape({}),
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func,
  childrenProps: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  initialValues: PropTypes.shape({}),
}

export default Form
