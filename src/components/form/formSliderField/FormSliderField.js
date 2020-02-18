import React from 'react'

import FormField from 'components/form/formField/FormField'
import FormCustomSlider from 'components/form/formCustomSlider/FormCustomSlider'

const FormSliderField = props => {
  return <FormField inputComponent={FormCustomSlider} {...props} />
}

export default FormSliderField
