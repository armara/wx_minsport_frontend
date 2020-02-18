import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Input from 'components/input/Input'

import 'components/searchInput/SearchInput.scss'

const SearchInput = ({ className, placeholder, onChange, value }) => (
  <div
    className={classnames([
      'search-input',
      'control',
      'has-icons-left',
      className,
    ])}
  >
    <Input
      className="input is-small"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <span className="icon is-small is-left">
      <i className="ic-search" />
    </span>
  </div>
)

SearchInput.defaultProps = {
  className: '',
  placeholder: 'Поиск',
}

SearchInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SearchInput
