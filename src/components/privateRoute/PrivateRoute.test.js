import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'

import PrivateRoute from 'components/privateRoute/PrivateRoute'

configure({ adapter: new Adapter() })

describe('<PrivateRoute />', () => {
  it('renders correctly default props', () => {
    localStorage.setItem('user', '{"test":"ok"}')
    const tree = renderer
      .create(
        <Router>
          <PrivateRoute path="/" render={() => <div />} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
