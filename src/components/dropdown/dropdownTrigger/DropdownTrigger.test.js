import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import DropdownTrigger from 'components/dropdown/dropdownTrigger/DropdownTrigger'

configure({ adapter: new Adapter() })

describe('<DropdownTrigger />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <DropdownTrigger onClick={() => {}} selectedItem="Peter the Great" />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
