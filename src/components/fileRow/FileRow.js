import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button/Button'

import 'components/fileRow/FileRow.scss'

const FileRow = ({ fileName, buttonText, onClick }) => (
  <>
    <span className="file-row_file-block">
      <i className="ic-pdf" />
      <span>{fileName}</span>
    </span>

    <Button className="file-row_button" onClick={onClick}>
      {buttonText}
    </Button>
  </>
)

FileRow.defaultProps = {
  onClick: () => {},
}

FileRow.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
}

export default FileRow
