import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import FileRow from 'components/fileRow/FileRow'

configure({ adapter: new Adapter() })

describe('<FileRow />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <FileRow fileName="Peter's embassy declaration" buttonText="button" />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
