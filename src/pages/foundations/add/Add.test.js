import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import Add from 'pages/foundations/add/Add'
import initialState from 'tests/initialStoreMock'
import { Provider } from 'react-redux'

jest.mock('utils/day')
configure({ adapter: new Adapter() })
const mockStore = configureStore()

describe('<Add />', () => {
  let store

  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    localStorage.setItem('user', '{"test":"ok"}')
  })

  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Router initialEntries={['/foundations']} initialIndex={0}>
          <Provider store={store}>
            <Add />
          </Provider>
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
