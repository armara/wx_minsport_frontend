import React from 'react'
import MenuWithRouter from 'components/menu/Menu'
import routes from 'router/routes'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('<Menu />', () => {
  const routeNotInRoutes = '/123'

  it('is actually the Menu component', () => {
    const renderedMenu = shallow(<MenuWithRouter />)
    expect(renderedMenu.name()).toEqual('ContextConsumer')
  })

  it('renders snapshot correctly with default privateRoute', () => {
    const tree = renderer
      .create(
        <Router>
          <MenuWithRouter routes={routes} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders snapshot correctly without specified privateRoute', () => {
    const tree = renderer
      .create(
        <Router initialEntries={[routeNotInRoutes]}>
          <MenuWithRouter routes={routes} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('does not show selector without specified privateRoute', () => {
    const renderedMenu = mount(
      <Router initialEntries={[routeNotInRoutes]}>
        <MenuWithRouter routes={routes} />
      </Router>
    )
    expect(renderedMenu.exists('.black-avatar')).toEqual(false)
  })

  it('have same list rows as routes with labels amount', () => {
    const renderedMenu = mount(
      <Router initialEntries={[routeNotInRoutes]}>
        <MenuWithRouter routes={routes} />
      </Router>
    )
    expect(renderedMenu.find('li').length).toEqual(
      routes.filter(route => !!route.label).length
    )
  })
})
