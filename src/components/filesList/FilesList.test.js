import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import FilesList from 'components/filesList/FilesList'
import { FoundationFiles } from 'utils/foundationSections'

configure({ adapter: new Adapter() })

describe('<FilesList />', () => {
  it('renders correctly default props', () => {
    const tree = renderer.create(<FilesList items={FoundationFiles} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
