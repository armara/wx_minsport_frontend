import React from 'react'
import { configure, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Button from 'components/button/Button'

configure({ adapter: new Adapter() })

describe('<Button />', () => {
  it('should be rendered without throwing an error', () => {
    expect(
      mount(<Button>Push the button</Button>).contains('Push the button')
    ).toBe(true)
  })

  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Button>
          <p>Peter Great Embassy</p>
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should be selectable by class ".button"', () => {
    expect(mount(<Button>Push the button</Button>).is('.button')).toBe(true)
  })

  it('should be selectable by "button" tag by default', () => {
    expect(mount(<Button />).find('button').length).toBe(1)
  })

  it('should be selectable by "a" tag if specified', () => {
    expect(mount(<Button element="a" />).find('a').length).toBe(1)
  })

  it('should have "button" type by default', () => {
    expect(mount(<Button />).prop('type')).toBe('button')
  })

  it('should have "submit" type if specified', () => {
    expect(mount(<Button type="submit" />).prop('type')).toBe('submit')
  })

  it('should mount in a full DOM', () => {
    expect(
      mount(<Button>Push the button</Button>).find('.base-button').length
    ).toBe(1)
  })

  it('should render to static HTML', () => {
    expect(render(<Button>Push the button</Button>).text()).toEqual(
      'Push the button'
    )
  })

  it('has selectable icon', () => {
    const button = mount(<Button icon="ic-search" />)
    expect(button.find('span').length).toBe(1)
    expect(button.find('span').find('.ic-search').length).toBe(1)
  })

  it('does not have icon by default', () => {
    expect(mount(<Button />).find('.icon').length).toBe(0)
  })

  it('triggers onClick correctly', () => {
    const mockCallback = jest.fn()
    const button = mount(
      <Button onClick={mockCallback}>Push the button</Button>
    )
    button.find('.base-button').simulate('click')
    expect(mockCallback.mock.calls.length).toEqual(1)
  })
})
