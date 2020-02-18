import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import PageHeader from 'components/pageHeader/PageHeader'

configure({ adapter: new Adapter() })

describe('<PageHeader />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(<PageHeader title="Peter's Great Embassy" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
