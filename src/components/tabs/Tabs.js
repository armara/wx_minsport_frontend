import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from 'components/link/Link'
import List from 'components/list/List'

import 'components/tabs/Tabs.scss'

const Tabs = ({ items, activeKey, className, onClick }) => {
  const clickedTab = e => {
    e.preventDefault()
    onClick(e)
  }

  return (
    <div className={classnames(['tabs', className])}>
      <List
        items={items}
        getRowClassName={(item, i) => {
          const ClassNames = !activeKey
            ? classnames({
                'is-active': i === 0,
              })
            : classnames({
                'is-active': activeKey === item.key,
              })

          return ClassNames
        }}
      >
        {item => (
          /* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */
          <Link
            target="_self"
            className={item.key}
            onClick={e => clickedTab(e)}
          >
            {item.title}
          </Link>
        )}
      </List>
    </div>
  )
}

Tabs.defaultProps = {
  items: [],
  activeKey: '',
  className: '',
  onClick: () => {},
}

Tabs.propTypes = {
  activeKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
  onClick: PropTypes.func,
}

export default Tabs
