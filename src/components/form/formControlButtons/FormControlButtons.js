import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button/Button'

import 'components/form/formControlButtons/FormControlButtons.scss'

const FormControlButtons = ({
  cancelText,
  successText,
  successType,
  onCancelClick,
  onSuccessClick,
}) => (
  <div className="form-control-buttons">
    <Button className="control-buttons_cancel" onClick={onCancelClick}>
      {cancelText}
    </Button>
    <Button
      className="is-success control-button-save"
      type={successType}
      onClick={onSuccessClick}
    >
      {successText}
    </Button>
  </div>
)

FormControlButtons.defaultProps = {
  cancelText: 'Отмена',
  successText: 'Сохранить',
  successType: 'submit',
  onCancelClick: () => {},
  onSuccessClick: () => {},
}

FormControlButtons.propTypes = {
  cancelText: PropTypes.string,
  successText: PropTypes.string,
  successType: PropTypes.string,
  onCancelClick: PropTypes.func,
  onSuccessClick: PropTypes.func,
}

export default FormControlButtons
