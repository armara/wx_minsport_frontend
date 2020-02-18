import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Button from 'components/button/Button'

import 'components/table/tableArrowPaginator/TableArrowPaginator.scss'

const getDisplayRange = (currentPage, pageSize, totalRows) => {
  const startNum = currentPage * pageSize
  const endNum = startNum + pageSize
  return `${startNum + 1} - ${endNum > totalRows ? totalRows : endNum}`
}

const Paginator = ({
  children,
  totalRows,
  currentPage,
  pageSize,
  pages,
  onBackClick,
  onForwardClick,
  className,
}) => (
  <div className={classnames([className, 'table-arrow-paginator'])}>
    <div>{children}</div>
    <span>
      <span>{`${getDisplayRange(
        currentPage,
        pageSize,
        totalRows
      )} из ${totalRows}`}</span>
      <Button
        icon="ic-arrow-back"
        size="is-small"
        onClick={onBackClick}
        disabled={currentPage === 0}
      />
      <Button
        icon="ic-arrow-forward"
        size="is-small"
        onClick={onForwardClick}
        disabled={currentPage === pages}
      />
    </span>
  </div>
)

Paginator.defaultProps = {
  children: () => {},
  className: '',
}

Paginator.propTypes = {
  totalRows: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onForwardClick: PropTypes.func.isRequired,
}

export default Paginator
