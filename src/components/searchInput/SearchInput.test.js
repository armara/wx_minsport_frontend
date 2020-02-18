import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import SearchInput from 'components/searchInput/SearchInput'

configure({ adapter: new Adapter() })

describe('<SearchInput />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(<SearchInput onChange={() => {}} value="test" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
