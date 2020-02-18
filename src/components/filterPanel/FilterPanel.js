import React from 'react'
import PropTypes from 'prop-types'

import FilterDropdownWithValue from 'components/filterDropdownWithValue/FilterDropdownWithValue'
import SearchInput from 'components/searchInput/SearchInput'

import './FilterPanel.scss'

const FilterPanel = ({ filters, onSearch, searchValue, searchPlaceholder }) => (
  <div className="list-filters">
    {onSearch && (
      <SearchInput
        placeholder={searchPlaceholder}
        className="filters-search"
        value={searchValue}
        onChange={onSearch}
      />
    )}

    {filters.map(
      ({
        id,
        items,
        onSelect,
        initialItem,
        selectedItem,
        inputPlaceholder,
      }) => (
        <FilterDropdownWithValue
          key={id}
          items={items}
          onChange={onSelect}
          menuId={`filters-${id}`}
          initialItem={initialItem}
          selectedItem={selectedItem}
          itemRenderer={item => item.item}
          inputPlaceholder={inputPlaceholder}
          getSearchValueFromItem={item => item.item}
        />
      )
    )}
  </div>
)

FilterPanel.defaultProps = {
  onSearch: undefined,
  searchValue: '',
  searchPlaceholder: '',
}

FilterPanel.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          'coach-id': PropTypes.number,
          item: PropTypes.string,
        })
      ),
      onChange: PropTypes.func,
      initialItem: PropTypes.shape({}),
      inputPlaceholder: PropTypes.string,
    })
  ).isRequired,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  onSearch: PropTypes.func,
}

export default FilterPanel
