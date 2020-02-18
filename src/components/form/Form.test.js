import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Form from 'components/form/Form'

configure({ adapter: new Adapter() })

describe('<Form />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Form onSubmit={() => {}} validate={() => {}}>
          test
        </Form>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
