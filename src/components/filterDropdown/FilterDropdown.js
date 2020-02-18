import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'components/dropdown/Dropdown'
import Input from 'components/input/Input'

import './FilterDropdown.scss'

const InputTrigger = ({
  props: {
    value,
    onChange,
    onFocus,
    onBlur,
    leftIconClassName,
    inputPlaceholder,
    disabled,
  } = {},
  onClick,
}) => (
  <p className="control has-icons-right has-icons-left input-trigger">
    <Input
      type="text"
      className="is-small"
      placeholder={inputPlaceholder}
      onChange={onChange}
      onFocus={event => {
        onClick(event)
        onFocus(event)
      }}
      onBlur={onBlur}
      disabled={disabled}
      value={value}
    />
    <span className="icon is-small is-left">
      <i className={leftIconClassName} />
    </span>
    <span className="icon is-small is-right">
      <i className="ic-keyboard-arrow-down" />
    </span>
  </p>
)

InputTrigger.propTypes = {
  props: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    leftIconClassName: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

const getFilteredItems = (items, itemRenderer, value, shouldFilter) => {
  if (!shouldFilter) return items

  return (
    items.filter(item =>
      itemRenderer(item)
        .toLowerCase()
        .includes(value.toLowerCase())
    ) || []
  )
}

const FilterDropdown = props => {
  const {
    disabled,
    items,
    itemRenderer,
    initialItem,
    idKey,
    menuId,
    value,
    onSelect,
    onChange,
    onFocus,
    onBlur,
    leftIconClassName,
    inputPlaceholder,
    notFoundPlaceholder,
  } = props

  const [shouldFilter, setShouldFilter] = useState(true)

  useEffect(() => {
    // refactor, please
    if (initialItem) setShouldFilter(false)
  }, [initialItem, setShouldFilter])

  const filteredItems = getFilteredItems(
    items,
    itemRenderer,
    value,
    shouldFilter
  )

  const onInputChange = ({ target: { value: inputValue } = {} }) => {
    if (!shouldFilter) setShouldFilter(true)
    onChange(inputValue)
  }

  const onItemSelect = item => {
    if (shouldFilter) setShouldFilter(false)
    onSelect(item, filteredItems)
  }

  return (
    <Dropdown
      idKey={idKey}
      menuId={menuId}
      initialItem={initialItem}
      onItemSelect={onItemSelect}
      items={filteredItems}
      notFoundPlaceholder={notFoundPlaceholder}
      listItemRenderer={itemRenderer}
      triggerComponent={InputTrigger}
      triggerComponentProps={{
        disabled,
        value,
        onChange: onInputChange,
        onBlur,
        onFocus,
        leftIconClassName,
        inputPlaceholder,
      }}
    />
  )
}

FilterDropdown.defaultProps = {
  leftIconClassName: 'ic-place',
  inputPlaceholder: 'Введите что-нибудь',
  initialItem: '',
  idKey: 'id',
  notFoundPlaceholder: undefined,
  disabled: false,
  onFocus: () => {},
  onBlur: () => {},
}

FilterDropdown.propTypes = {
  disabled: PropTypes.bool,
  leftIconClassName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  itemRenderer: PropTypes.func.isRequired,
  idKey: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  notFoundPlaceholder: PropTypes.string,
  menuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default FilterDropdown
