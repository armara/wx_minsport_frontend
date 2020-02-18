import React from 'react'
import PropTypes from 'prop-types'

import FileRow from 'components/fileRow/FileRow'
import List from 'components/list/List'
import Button from 'components/button/Button'
import FileBase64 from 'components/fileBase64/FileBase64'
import ToolTipIcon from 'components/toolTip/icon/ToolTipIcon'

import './FilesList.scss'

const FilesList = ({
  items,
  headerText,
  shouldAddMore,
  className,
  onRowClick,
  onAddClick,
  accept,
  fileTypeDataTip,
  addMoreDataTip,
}) => (
  <div className="files-list">
    <h4>
      {headerText}{' '}
      {fileTypeDataTip && <ToolTipIcon dataTip={fileTypeDataTip} />}{' '}
    </h4>
    {items.length > 0 && (
      <List items={items} className={className}>
        {({ id, name, actionName }) => (
          <FileRow
            fileName={name}
            buttonText={actionName || 'Удалить'}
            onClick={() => onRowClick(id)}
          />
        )}
      </List>
    )}
    {shouldAddMore && (
      <>
        <Button
          className="inline-button"
          onClick={() =>
            document.querySelectorAll('input[type="file"]')[0].click()
          }
        >
          Добавить еще файл
        </Button>
        {addMoreDataTip && <ToolTipIcon dataTip={addMoreDataTip} />}
        <FileBase64 onDone={onAddClick} accept={accept} />
      </>
    )}
  </div>
)

FilesList.defaultProps = {
  className: '',
  headerText: 'Файлы',
  shouldAddMore: false,
  onRowClick: () => {},
  onAddClick: () => {},
  accept: null,
  fileTypeDataTip: '',
  addMoreDataTip: '',
}

FilesList.propTypes = {
  className: PropTypes.string,
  shouldAddMore: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerText: PropTypes.string,
  onRowClick: PropTypes.func,
  onAddClick: PropTypes.func,
  accept: PropTypes.string,
  fileTypeDataTip: PropTypes.string,
  addMoreDataTip: PropTypes.string,
}

export default FilesList
