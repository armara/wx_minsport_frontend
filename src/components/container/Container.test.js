import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Container from 'components/container/Container'

configure({ adapter: new Adapter() })

describe('<Container />', () => {
  it('renders correctly default props', () => {
    const tree = renderer.create(<Container>test</Container>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
