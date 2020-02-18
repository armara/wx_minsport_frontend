import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import FormControlButtons from 'components/form/formControlButtons/FormControlButtons'

configure({ adapter: new Adapter() })

describe('<FormControlButtons />', () => {
  it('renders correctly default props', () => {
    const tree = renderer.create(<FormControlButtons />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
