import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ToolTipIcon from 'components/toolTip/icon/ToolTipIcon'

import 'components/checkbox/Checkbox.scss'

const Checkbox = ({
  label,
  onClick,
  isSelected,
  callbackParams,
  disabled,
  className,
  dataTip,
}) => (
  <div
    className={classnames([
      className,
      'base-checkbox',
      isSelected && 'base-checkbox_selected',
    ])}
  >
    {/* it seems like eslint does not recognize label-wrapped input */}
    {/* eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */}
    <label className="checkbox">
      <input
        type="checkbox"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            onClick(callbackParams)
          }
        }}
      />
      <span>{label}</span>
      {dataTip && <ToolTipIcon dataTip={dataTip} />}
    </label>
  </div>
)

Checkbox.defaultProps = {
  className: '',
  label: '',
  callbackParams: {},
  disabled: false,
  isSelected: false,
  dataTip: '',
}

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func.isRequired,
  callbackParams: PropTypes.shape({}),
  dataTip: PropTypes.string,
}

export default Checkbox
