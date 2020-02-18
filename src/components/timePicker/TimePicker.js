import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'

import Dropdown from 'components/dropdown/Dropdown'
import DropdownTimePickerList from 'components/dropdownTimePickerList/DropdownTimePickerList'

import parseInputMaskValue from 'utils/parseInputMaskValue'

import './TimePicker.scss'

const DropdownTimePickerInput = ({
  onClick,
  isActive,
  props: { value, onChange, placeholder } = {},
}) => {
  const memoizedOnClick = useCallback(() => {
    if (isActive) return
    onClick()
  }, [onClick, isActive])

  return (
    <div className="time-input-field control has-icons-right">
      <InputMask
        value={value}
        onClick={memoizedOnClick}
        onChange={onChange}
        className="form-input"
        autoComplete="off"
        placeholder={placeholder}
        mask="99:99"
      />
      <span className="icon is-small is-right">
        <i className="ic-keyboard-arrow-down" aria-hidden="true" />
      </span>
    </div>
  )
}

DropdownTimePickerInput.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  props: PropTypes.shape({
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
}

const TimePicker = ({ menuId, placeholder, value, onChange, onSelect }) => {
  const memoizedOnChange = useCallback(
    ({ target: { value: inputValue } = {} }) => {
      // can refactor to the single source of truth
      onSelect(inputValue)
      onChange(inputValue)
    },
    [onChange, onSelect]
  )

  const memoizedOnSelect = useCallback(
    selectedValue => {
      onSelect(selectedValue)
      onChange(selectedValue)
    },
    [onChange, onSelect]
  )

  const [hours, minutes] = useMemo(() => {
    const result = parseInputMaskValue(value)
    return result.split(':')
  }, [value])

  return (
    <Dropdown
      items={[]}
      menuId={menuId}
      onItemSelect={memoizedOnSelect}
      listComponent={DropdownTimePickerList}
      triggerComponent={DropdownTimePickerInput}
      triggerComponentProps={useMemo(
        () => ({
          placeholder,
          value,
          onChange: memoizedOnChange,
        }),
        [placeholder, value, memoizedOnChange]
      )}
      listComponentProps={useMemo(
        () => ({
          hours,
          minutes,
          id: `${menuId}-time-picker`,
        }),
        [hours, minutes, menuId]
      )}
    />
  )
}

TimePicker.defaultProps = {
  placeholder: 'чч:мм',
}

TimePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  menuId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default TimePicker
