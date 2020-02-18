import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import FilterDropdownWithValue from 'components/filterDropdownWithValue/FilterDropdownWithValue'

import './FormFilterDropdownWithValue.scss'

const FormFilterDropdownWithValue = ({
  items,
  disabled,
  itemRenderer,
  name,
  menuId,
  getSearchValueFromItem,
  initialItem,
  titleKey,
  inputPlaceholder,
  notFoundPlaceholder,
  input: { onChange, value, onFocus, onBlur },
}) => {
  const memoizedItemRenderer = useCallback(
    item => {
      if (itemRenderer) return itemRenderer(item)
      return item[titleKey]
    },
    [titleKey, itemRenderer]
  )

  return (
    <div className="form-filter-dropdown-with-value">
      <FilterDropdownWithValue
        shouldInitWithSelectedItem
        disabled={disabled}
        items={items}
        menuId={menuId || `dropdown-${name}-menuId`}
        selectedItem={value}
        initialItem={initialItem}
        itemRenderer={memoizedItemRenderer}
        inputPlaceholder={inputPlaceholder}
        notFoundPlaceholder={notFoundPlaceholder}
        getSearchValueFromItem={getSearchValueFromItem || memoizedItemRenderer}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

FormFilterDropdownWithValue.defaultProps = {
  initialItem: {},
  inputPlaceholder: 'Введите что-нибудь',
  notFoundPlaceholder: 'Не найдено',
  disabled: false,
  getSearchValueFromItem: null,
  itemRenderer: null,
  titleKey: 'title',
  menuId: null,
}

FormFilterDropdownWithValue.propTypes = {
  menuId: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  getSearchValueFromItem: PropTypes.func,
  itemRenderer: PropTypes.func,
  notFoundPlaceholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialItem: PropTypes.shape({}),
  inputPlaceholder: PropTypes.string,
  titleKey: PropTypes.string,
}

export default FormFilterDropdownWithValue
