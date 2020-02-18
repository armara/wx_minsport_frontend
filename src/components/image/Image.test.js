import React from 'react'
import Image from 'components/image/Image'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('<Image />', () => {
  it('renders correctly default props', () => {
    const tree = renderer.create(<Image src="hello" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
