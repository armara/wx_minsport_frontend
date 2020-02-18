import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button/Button'

import 'components/dropdown/dropdownTrigger/DropdownTrigger.scss'

const DropdownTrigger = ({ selectedItem, onClick }) => (
  <Button
    type="button"
    aria-haspopup="true"
    aria-controls="dropdown-menu2"
    onClick={onClick}
    className="dropdown-trigger"
  >
    <>
      <div>{selectedItem}</div>
      <span className="icon is-small">
        <i className="ic-keyboard-arrow-down" aria-hidden="true" />
      </span>
    </>
  </Button>
)

DropdownTrigger.propTypes = {
  selectedItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default DropdownTrigger
