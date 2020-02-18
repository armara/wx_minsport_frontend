import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import DropdownList from 'components/dropdown/dropdownList/DropdownList'
import DropdownTrigger from 'components/dropdown/dropdownTrigger/DropdownTrigger'

import 'components/dropdown/Dropdown.scss'

const Dropdown = ({
  menuId,
  titleKey,
  idKey,
  initialItem,
  items,
  onItemSelect,
  listItemRenderer,
  selectedItemRenderer,
  notFoundPlaceholder,
  listComponent: ListComponent,
  triggerComponent: TriggerComponent,
  triggerComponentProps,
  listComponentProps,
}) => {
  const [isActive, toggleActive] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(initialItem)

  const changeActiveState = useCallback(() => toggleActive(!isActive), [
    isActive,
    toggleActive,
  ])
  const handleItemSelect = useCallback(
    item => {
      setSelectedTitle(item)
      toggleActive(false)
      onItemSelect(item)
    },
    [setSelectedTitle, toggleActive, onItemSelect]
  )

  const selectedItem = useMemo(() => {
    if (selectedItemRenderer) {
      return selectedItemRenderer(selectedTitle, selectedTitle[titleKey])
    }

    if (selectedTitle[titleKey]) return selectedTitle[titleKey]

    return selectedTitle
  }, [selectedItemRenderer, selectedTitle, titleKey])

  useEffect(() => {
    setSelectedTitle(initialItem)
  }, [initialItem, setSelectedTitle])

  const memoizedOnWindowClick = useCallback(
    event => {
      const { target } = event
      if (target.closest(`#${menuId}`)) return
      if (isActive === true) toggleActive(false)
    },
    [menuId, isActive, toggleActive]
  )
  useEffect(() => {
    if (typeof window === 'undefined') return null

    window.addEventListener('click', memoizedOnWindowClick)
    return () => window.removeEventListener('click', memoizedOnWindowClick)
  }, [memoizedOnWindowClick])

  return (
    <div
      className={classnames(['dropdown', isActive ? 'is-active' : ''])}
      id={menuId}
    >
      <div className="dropdown-trigger">
        <TriggerComponent
          onClick={changeActiveState}
          isActive={isActive}
          selectedItem={selectedItem}
          props={triggerComponentProps}
        />
      </div>
      <div className="dropdown-menu" role="menu">
        <ListComponent
          items={items}
          titleKey={titleKey}
          idKey={idKey}
          onItemSelect={handleItemSelect}
          listItemRenderer={listItemRenderer}
          notFoundPlaceholder={notFoundPlaceholder}
          props={listComponentProps}
        />
      </div>
    </div>
  )
}

Dropdown.defaultProps = {
  initialItem: '',
  titleKey: 'title',
  idKey: 'id',
  onItemSelect: () => {},
  listItemRenderer: undefined,
  selectedItemRenderer: undefined,
  notFoundPlaceholder: undefined,
  listComponent: DropdownList,
  triggerComponent: DropdownTrigger,
  triggerComponentProps: {},
  listComponentProps: {},
}

Dropdown.propTypes = {
  initialItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  listItemRenderer: PropTypes.func,
  selectedItemRenderer: PropTypes.func,
  titleKey: PropTypes.string,
  idKey: PropTypes.string,
  onItemSelect: PropTypes.func,
  notFoundPlaceholder: PropTypes.string,
  listComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  triggerComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  triggerComponentProps: PropTypes.shape({}),
  listComponentProps: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Dropdown
