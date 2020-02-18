import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FileBase64 extends Component {
  handleChange(e) {
    const { multiple, onDone } = this.props
    const { files } = e.target
    const allFiles = []
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: `${Math.round(file.size / 1000)} kB`,
          base64: reader.result,
          file,
        }
        allFiles.push(fileInfo)
        if (allFiles.length === files.length) {
          if (multiple) onDone(allFiles)
          else onDone(allFiles[0])
        }
      }
    }
  }

  render() {
    const { multiple, accept } = this.props
    return (
      <input
        type="file"
        onChange={this.handleChange.bind(this)}
        multiple={multiple}
        accept={accept}
      />
    )
  }
}

FileBase64.defaultProps = {
  multiple: false,
  onDone: () => {},
  accept: null,
}

FileBase64.propTypes = {
  multiple: PropTypes.bool,
  onDone: PropTypes.func,
  accept: PropTypes.string,
}

export default FileBase64
