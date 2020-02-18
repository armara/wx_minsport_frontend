import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import FileUploader from 'components/fileUploader/FileUploader'

configure({ adapter: new Adapter() })

describe('<FileUploader />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(<FileUploader id="test" input={{ onChange: () => {} }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
