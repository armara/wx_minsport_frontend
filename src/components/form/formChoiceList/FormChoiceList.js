import React from 'react'
import PropTypes from 'prop-types'

import ChoiceList from 'components/choiceList/ChoiceList'

const FormChoiceList = ({
  input: { value, onChange },
  itemRenderer,
  itemFilterer,
  shouldRenderCounter,
  shouldRenderSearch,
  shouldRenderSelectedOnly,
  notFoundItem,
  items,
  keyId,
}) => (
  <ChoiceList
    onChange={onChange}
    value={value}
    itemRenderer={itemRenderer}
    itemFilterer={itemFilterer}
    showCounter={shouldRenderCounter}
    showSelectedOnly={shouldRenderSelectedOnly}
    showSearch={shouldRenderSearch}
    notFoundItem={notFoundItem}
    items={items}
    keyId={keyId}
  />
)

FormChoiceList.defaultProps = {
  shouldRenderSearch: true,
  shouldRenderCounter: true,
  shouldRenderSelectedOnly: true,
  notFoundItem: 'Элементов в списке нет',
  keyId: 'key',
}

FormChoiceList.propTypes = {
  itemRenderer: PropTypes.func.isRequired,
  itemFilterer: PropTypes.func.isRequired,
  shouldRenderCounter: PropTypes.bool,
  shouldRenderSelectedOnly: PropTypes.bool,
  shouldRenderSearch: PropTypes.bool,
  notFoundItem: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  keyId: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    ),
  }).isRequired,
}

export default FormChoiceList
