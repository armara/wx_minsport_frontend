import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { MemoryRouter as Router } from 'react-router-dom'

import BackButton from 'components/button/backButton/BackButton'

configure({ adapter: new Adapter() })

describe('<BackButton />', () => {
  const buttonText = 'Вернуться назад'
  const button = mount(<BackButton text={buttonText} />, {
    wrappingComponent: Router,
  })

  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Router>
          <BackButton text={buttonText} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders "text" prop correctly', () => {
    const withStringText = mount(
      <Router>
        <BackButton text={buttonText} />
      </Router>
    )
    const withElementText = mount(
      <Router>
        <BackButton
          text={<div className="back-button-text">{buttonText}</div>}
        />
      </Router>
    )

    expect(withStringText.text()).toEqual(buttonText)
    expect(withElementText.find('.back-button-text').text()).toEqual(buttonText)
  })

  it('is selectable by class ".back-button"', () => {
    expect(button.find('button.back-button').length).toBe(1)
  })

  it('has ".ic-arrow-back" icon', () => {
    expect(button.find('.ic-arrow-back').length).toBe(1)
  })

  it('triggers passed onClick function correctly', () => {
    const mockCallback = jest.fn()
    const buttonWrap = mount(
      <BackButton text={buttonText} onClick={mockCallback} />,
      {
        wrappingComponent: Router,
      }
    )
    buttonWrap
      .find('button.back-button')
      .props()
      .onClick()

    expect(mockCallback.mock.calls.length).toEqual(1)
  })

  it('triggers default goBack function', () => {
    expect(button.find('button.back-button').props().onClick).toBeInstanceOf(
      Function
    )
  })
})
