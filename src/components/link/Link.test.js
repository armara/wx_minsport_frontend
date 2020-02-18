import React from 'react'
import Link from 'components/link/Link'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('<Link />', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<Link href="test" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly mock props', () => {
    const tree = renderer
      .create(
        <Link
          href="/"
          target="_self"
          onClick={() => {}}
          className="embassy_konigsberg"
        >
          <span>Peters Grand Embassy</span>
        </Link>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
