import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Button from 'components/button/Button'

import 'components/dropdown/dropdownList/DropdownList.scss'

const renderItem = (listItemRenderer, item, titleKey) => {
  if (typeof listItemRenderer === 'function') {
    return listItemRenderer(item, item[titleKey])
  }

  if (typeof item[titleKey] === 'function') {
    return item[titleKey](item)
  }

  return item[titleKey] || ''
}

const DropdownList = ({
  items,
  notFoundPlaceholder,
  listItemRenderer,
  titleKey,
  idKey,
  onItemSelect,
  className,
}) => (
  <ul className={classnames([className, 'dropdown-content', 'menu-list'])}>
    {items.length === 0 ? (
      <span className="dropdown-item dropdown-item_empty">
        {notFoundPlaceholder}
      </span>
    ) : (
      items.map(item => (
        <Button
          type="button"
          key={item[idKey]}
          className="dropdown-item"
          onClick={() => {
            onItemSelect(item)
          }}
        >
          {renderItem(listItemRenderer, item, titleKey)}
        </Button>
      ))
    )}
  </ul>
)

DropdownList.defaultProps = {
  onItemSelect: () => {},
  notFoundPlaceholder: 'Пусто',
  listItemRenderer: null,
  className: '',
}

DropdownList.propTypes = {
  className: PropTypes.string,
  titleKey: PropTypes.string.isRequired,
  idKey: PropTypes.string.isRequired,
  notFoundPlaceholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  listItemRenderer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(null),
  ]),
  onItemSelect: PropTypes.func,
}

export default DropdownList
