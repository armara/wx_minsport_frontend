import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from 'components/dropdown/Dropdown'
import { dropdownItems } from 'pages/foundations/list/mocks'

import 'components/form/formDropdown/FormDropdown.scss'

const FormDropdown = ({
  items,
  menuId,
  titleKey,
  idKey,
  listComponent,
  triggerComponent,
  listItemRenderer,
  selectedItemRenderer,
  triggerComponentProps,
  input: { name, onChange, value } = {},
}) => {
  return (
    <div className="form-dropdown">
      <Dropdown
        name={name}
        idKey={idKey}
        items={items}
        menuId={menuId}
        titleKey={titleKey}
        initialItem={value}
        triggerComponent={triggerComponent}
        listComponent={listComponent}
        onItemSelect={onChange}
        listItemRenderer={listItemRenderer}
        selectedItemRenderer={selectedItemRenderer}
        triggerComponentProps={triggerComponentProps}
      />
    </div>
  )
}

FormDropdown.defaultProps = {
  items: dropdownItems,
  titleKey: 'title',
  idKey: 'id',
  listComponent: undefined,
  triggerComponent: undefined,
  listItemRenderer: null,
  selectedItemRenderer: undefined,
  triggerComponentProps: {},
}

FormDropdown.propTypes = {
  titleKey: PropTypes.string,
  idKey: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  triggerComponentProps: PropTypes.shape({}),
  listComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.oneOf([undefined]),
  ]),
  triggerComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.oneOf([undefined]),
  ]),
  menuId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  listItemRenderer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(null),
  ]),
  selectedItemRenderer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(null),
  ]),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
  }).isRequired,
}

export default FormDropdown
