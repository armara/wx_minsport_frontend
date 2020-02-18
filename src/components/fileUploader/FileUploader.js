import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import FileBase64 from 'components/fileBase64/FileBase64'
import Button from 'components/button/Button'
import Input from 'components/input/Input'

import 'components/fileUploader/FileUploader.scss'

const FileUploader = ({ className, id, name, input: { onChange }, accept }) => {
  const [file, setFile] = useState({ name: '', base64: '' })

  return (
    <div className={classnames([className, 'file-uploader'])}>
      <Input
        value={file.name}
        className="form-input"
        id={id}
        name={name}
        disabled
      />
      <FileBase64
        accept={accept}
        onDone={f => {
          onChange(f)
          setFile(f)
        }}
      />
      <Button
        className="grey-control-button"
        onClick={() =>
          document.querySelectorAll('input[type="file"]')[0].click()
        }
      >
        Выбрать
      </Button>
    </div>
  )
}

FileUploader.defaultProps = {
  className: '',
  name: '',
  accept: null,
}

FileUploader.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }).isRequired,
  accept: PropTypes.string,
}

export default FileUploader
