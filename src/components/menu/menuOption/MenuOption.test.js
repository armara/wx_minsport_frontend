import React from 'react'
import MenuOption from 'components/menu/menuOption/MenuOption'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('<MenuOption />', () => {
  let renderedOption
  const label = 'Test line label'
  const path = 'path'

  beforeEach(() => {
    renderedOption = shallow(
      <MenuOption exact label={label} pathname={path} path={path} />
    )
  })

  it('has correct length', () => {
    expect(renderedOption.length).toEqual(1)
  })

  it('has correct text', () => {
    expect(renderedOption.find('span').text()).toEqual('')
  })

  it('renders correctly', () => {
    const renderedValue = renderer
      .create(
        <Router initialEntries={['/foundations']} initialIndex={0}>
          <MenuOption exact label={label} path={path} pathname={path} />
        </Router>
      )
      .toJSON()
    expect(renderedValue).toMatchSnapshot()
  })
})
