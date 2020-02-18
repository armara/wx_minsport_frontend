import React from 'react'
import PropTypes from 'prop-types'

import FilterDropdown from 'components/filterDropdown/FilterDropdown'

const FilterDropdownWithValue = ({
  items,
  disabled,
  menuId,
  itemRenderer,
  getSearchValueFromItem,
  initialItem,
  selectedItem,
  inputPlaceholder,
  notFoundPlaceholder,
  onSelect,
  onChange,
  onFocus,
  onBlur,
}) => {
  let textValue = ''
  if (typeof selectedItem === 'string') {
    // if value is typed manually
    textValue = selectedItem
  }

  if (typeof selectedItem === 'object') {
    // if value is selected item
    textValue = getSearchValueFromItem(selectedItem) || ''
  }

  return (
    <FilterDropdown
      disabled={disabled}
      menuId={menuId}
      items={items}
      value={textValue}
      itemRenderer={itemRenderer}
      inputPlaceholder={inputPlaceholder}
      notFoundPlaceholder={notFoundPlaceholder}
      initialItem={initialItem}
      onChange={onChange}
      onSelect={onSelect || onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

FilterDropdownWithValue.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  initialItem: {},
  selectedItem: '',
  inputPlaceholder: 'Введите что-нибудь',
  notFoundPlaceholder: undefined,
  disabled: false,
  // refactor as soon as possible
  onSelect: null,
}

FilterDropdownWithValue.propTypes = {
  disabled: PropTypes.bool,
  getSearchValueFromItem: PropTypes.func.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  notFoundPlaceholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialItem: PropTypes.shape({}),
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inputPlaceholder: PropTypes.string,
}

export default FilterDropdownWithValue
