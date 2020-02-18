import React from 'react'
import PropTypes from 'prop-types'
import Image from 'components/image/Image'

import './TableCellAvatar.scss'

const TableCellAvatar = ({ base64Text, title, sourceMode = 'base64' }) => {
  const showImage =
    sourceMode === 'base64' ? (
      <Image src={`data:image/jpeg;base64,${base64Text}`} alt="Фото" />
    ) : (
      <img src={base64Text} alt="Фото" />
    )

  return (
    <div className="table-cell-avatar">
      {showImage}
      <h4>{title}</h4>
    </div>
  )
}

TableCellAvatar.propTypes = {
  base64Text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sourceMode: PropTypes.string.isRequired,
}

export default TableCellAvatar
