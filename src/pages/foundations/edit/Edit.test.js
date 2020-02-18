import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import Edit from 'pages/foundations/edit/Edit'
import initialState from 'tests/initialStoreMock'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

describe.skip('<Edit />', () => {
  let store
  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    Date.now = jest.fn(() => 1482363367071)
    localStorage.setItem('user', '{"test":"ok"}')
  })

  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Router initialEntries={['/foundations']} initialIndex={0}>
          <Provider store={store}>
            <Edit />
          </Provider>
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
