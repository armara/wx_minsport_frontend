import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { updateUserData } from 'utils/user'
import { logout } from 'utils/auth'
import Header from 'components/header/Header'
import initialState, { mockUser } from 'tests/initialStoreMock'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

describe('<Header />', () => {
  let store

  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    updateUserData(mockUser)
  })

  afterEach(() => {
    logout()
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router initialEntries={['/facilities']} initialIndex={0}>
          <Provider store={store}>
            <Header />
          </Provider>
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
