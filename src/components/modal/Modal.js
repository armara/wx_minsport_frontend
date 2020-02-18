import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Button from 'components/button/Button'

import './Modal.scss'

const Modal = ({
  isOpen,
  text,
  onOk,
  onCancel,
  okText,
  cancelText,
  withOk,
  withCancel,
}) => (
  <div className={classnames('modal', 'base-modal', { 'is-active': isOpen })}>
    <div
      role="button"
      tabIndex="0"
      className="modal-background"
      onKeyPress={() => {}}
      onClick={onCancel}
    />
    <div className="modal-content">
      <div className="box">
        <span className="title is-4">{text}</span>
        {withOk && (
          <Button
            className="is-success control-button-save"
            onClick={() => {
              onOk()
              onCancel()
            }}
          >
            {okText}
          </Button>
        )}
        {withCancel && (
          <Button className="control-buttons_cancel" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
      </div>
    </div>
  </div>
)

Modal.defaultProps = {
  okText: 'Ок',
  cancelText: 'Отмена',
  withOk: true,
  withCancel: true,
  onOk: () => {},
  onCancel: () => {},
}

Modal.propTypes = {
  withOk: PropTypes.bool,
  withCancel: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
}

export default Modal
