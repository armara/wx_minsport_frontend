import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import DayPicker from 'components/dayPicker/DayPicker'

configure({ adapter: new Adapter() })

describe.skip('<DayPicker />', () => {
  it('renders correctly default props', () => {
    const tree = renderer.create(<DayPicker />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
