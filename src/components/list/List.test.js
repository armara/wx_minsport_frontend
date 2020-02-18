import React from 'react'
import List from 'components/list/List'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import { FoundationItems } from 'utils/foundationSections'

configure({ adapter: new Adapter() })

describe('<List />', () => {
  it('renders correctly default props', () => {
    const tree = renderer.create(<List items={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly default mock list', () => {
    const tree = renderer
      .create(
        <List
          items={FoundationItems({
            orgType: 'orgType1',
            contractTitle: 'contractTitle1',
            reg: 0,
            end: 10,
          })}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
