import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Image from 'components/image/Image'

import 'components/list/List.scss'

const rowRenderer = item => {
  if (item.type === 'hr') {
    return <hr />
  }

  const { spanClassName } = item

  return (
    <>
      <div>
        {item.image && <Image src={item.image} />}
        <h4>{item.field}</h4>
      </div>

      {!item.value ? (
        '---'
      ) : (
        <span className={spanClassName}>{item.value}</span>
      )}
    </>
  )
}

const List = ({
  id,
  keyId,
  items,
  children,
  className,
  rowClassName,
  getRowClassName,
  notFoundItem,
  childrenProps,
}) => (
  <ul className={classnames([className, 'base-list'])} id={id}>
    {items.length === 0 ? (
      <li className="base-list_not-found">{notFoundItem}</li>
    ) : (
      items.map((item, i) => (
        <li
          key={item[keyId]}
          className={classnames([rowClassName, getRowClassName(item, i)])}
        >
          {children ? children(item, childrenProps) : rowRenderer(item)}
        </li>
      ))
    )}
  </ul>
)

List.defaultProps = {
  id: null,
  keyId: 'key',
  className: '',
  rowClassName: '',
  children: '',
  getRowClassName: () => {},
  childrenProps: {},
  notFoundItem: 'Не найдено',
}

List.propTypes = {
  id: PropTypes.string,
  keyId: PropTypes.string,
  className: PropTypes.string,
  rowClassName: PropTypes.string,
  getRowClassName: PropTypes.func,
  notFoundItem: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      image: PropTypes.string,
      field: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOf(['hr']),
    })
  ).isRequired,
  childrenProps: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default List
