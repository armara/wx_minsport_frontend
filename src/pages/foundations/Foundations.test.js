import React from 'react'
import { configure } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import Foundations from 'pages/foundations/Foundations'
import routes from 'router/routes'
import initialState from 'tests/initialStoreMock'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

describe('<Foundations />', () => {
  let store

  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    localStorage.setItem('user', '{"test":"ok"}')
  })

  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Router initialEntries={['/facilities/foundations']} initialIndex={0}>
          <Provider store={store}>
            <Foundations routes={routes} />
          </Provider>
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
