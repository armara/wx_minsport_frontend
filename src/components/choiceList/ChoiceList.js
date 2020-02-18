import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import Scrollbar from 'components/scrollbar/Scrollbar'
import SearchInput from 'components/searchInput/SearchInput'
import List from 'components/list/List'
import Checkbox from 'components/checkbox/Checkbox'

import './ChoiceList.scss'

const ChoiceList = ({
  items,
  keyId,
  value,
  onChange,
  showSearch,
  showCounter,
  notFoundItem,
  itemRenderer: itemRendererProp,
  itemFilterer: itemFiltererProp,
  showSelectedOnly: showSelectedOnlyButton,
}) => {
  const { length: itemsLength } = items
  const { length: selectedItemsLength } = value

  const [searchValue, setSearchValue] = useState('')
  const [showSelectedOnly, setShowSelectedOnlyValue] = useState(false)

  const onSearchValueChange = useCallback(
    ({ target: { value: inputValue } = {} }) => setSearchValue(inputValue),
    [setSearchValue]
  )

  const changeSelectedOnlyFlag = useCallback(
    () => setShowSelectedOnlyValue(!showSelectedOnly),
    [showSelectedOnly, setShowSelectedOnlyValue]
  )

  const filterItems = useCallback(
    item => itemFiltererProp(item, value, { searchValue, showSelectedOnly }),
    [searchValue, showSelectedOnly, value, itemFiltererProp]
  )

  const renderListItem = useCallback(
    item => itemRendererProp(item, value, onChange),
    [onChange, itemRendererProp, value]
  )

  const filteredItems = useMemo(() => items.filter(filterItems), [
    items,
    filterItems,
  ])

  return (
    <div className="choice-list">
      {showSearch && (
        <div className="choice-list_params">
          <SearchInput value={searchValue} onChange={onSearchValueChange} />
          {showSelectedOnlyButton && (
            <div className="choice-list_params_all">
              <Checkbox
                onClick={changeSelectedOnlyFlag}
                isSelected={showSelectedOnly}
              />
              <span>Показать выбранные</span>
            </div>
          )}
        </div>
      )}

      <Scrollbar>
        <List items={filteredItems} notFoundItem={notFoundItem} keyId={keyId}>
          {renderListItem}
        </List>
      </Scrollbar>

      {showCounter && (
        <h5>
          Выбрано {selectedItemsLength} из {itemsLength}
        </h5>
      )}
    </div>
  )
}

ChoiceList.defaultProps = {
  showSearch: true,
  showCounter: true,
  showSelectedOnly: true,
  notFoundItem: 'Элементов в списке нет',
  keyId: 'key',
}

ChoiceList.propTypes = {
  keyId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showSearch: PropTypes.bool,
  showCounter: PropTypes.bool,
  showSelectedOnly: PropTypes.bool,
  itemRenderer: PropTypes.func.isRequired,
  itemFilterer: PropTypes.func.isRequired,
  notFoundItem: PropTypes.string,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ChoiceList
