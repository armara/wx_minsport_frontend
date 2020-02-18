import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Button from 'components/button/Button'

import 'components/modal/Modal.scss'

const DeleteEventModal = ({
  isOpen,
  remove,
  removeAll,
  cancel,
  onKeyPress,
}) => (
  <div className={classnames('modal', 'base-modal', { 'is-active': isOpen })}>
    <div
      role="button"
      tabIndex="0"
      className="modal-background"
      onKeyPress={onKeyPress}
      onClick={cancel}
    />
    <div className="modal-content">
      <div className="box box-flex-wrap">
        <span className="title is-4 span-100">
          Удаление занятия/мероприятия
        </span>

        <Button className="is-success control-button-save" onClick={remove}>
          Удалить это занятие
        </Button>
        <Button className="is-success control-button-save" onClick={removeAll}>
          Удалить все занятия
        </Button>
        <Button className="control-buttons_cancel" onClick={cancel}>
          Отмена
        </Button>
      </div>
    </div>
  </div>
)

DeleteEventModal.defaultProps = {
  onKeyPress: e => e.stopPropagation(),
}

DeleteEventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
}

export default DeleteEventModal
