import React from 'react'
import PropTypes from 'prop-types'

import FormField from 'components/form/formField/FormField'
import FileUploader from 'components/fileUploader/FileUploader'

const FormFileUploaderField = ({ label, name, accept, dataTip }) => (
  <FormField
    inputComponent={FileUploader}
    label={label}
    name={name}
    accept={accept}
    dataTip={dataTip}
  />
)

FormFileUploaderField.defaultProps = {
  accept: null,
  dataTip: '',
}

FormFileUploaderField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  accept: PropTypes.string,
  dataTip: PropTypes.string,
}

export default FormFileUploaderField
