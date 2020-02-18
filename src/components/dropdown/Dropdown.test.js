import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Dropdown from 'components/dropdown/Dropdown'

import { dropdownItems } from 'pages/foundations/list/mocks'

configure({ adapter: new Adapter() })

describe('<Dropdown />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Dropdown
          items={dropdownItems}
          menuId="Peters Konigsberg Great Embassy"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('opens on button click', () => {})

  it('renders list correctly', () => {})

  it('closes on outside click', () => {})

  it('closes on button click', () => {})
})
