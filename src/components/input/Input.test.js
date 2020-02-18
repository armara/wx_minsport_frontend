import React from 'react'
import Input from 'components/input/Input'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

describe('<Input />', () => {
  const testInputValue = 'hohenzollern'
  const inputWrapper = mount(<Input value={testInputValue} />)
  const findInput = (wrapper = inputWrapper) => wrapper.find('.base-input')

  it('renders correctly default props', () => {
    const tree = renderer.create(<Input value={testInputValue} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('is stateless component', () => {
    const renderedInput = mount(<Input value={testInputValue} />)
    const instance = renderedInput.instance()

    expect(instance).toEqual(null)
  })

  it('is selectable with input tag', () => {
    expect(findInput().length).toBe(1)
  })
})
