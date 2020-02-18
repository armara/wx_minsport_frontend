import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import DayPickerInput from 'components/calendarInput/CalendarInput'

configure({ adapter: new Adapter() })

describe('<DayPickerInput />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(<DayPickerInput input={{ name: 'name' }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
