import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import DropdownList from 'components/dropdown/dropdownList/DropdownList'
import { dropdownItems } from 'pages/foundations/list/mocks'

configure({ adapter: new Adapter() })

describe('<DropdownList />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <DropdownList items={dropdownItems} titleKey="title" idKey="id" />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
