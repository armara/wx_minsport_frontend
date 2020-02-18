import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Position from 'components/form/formPositionFields/FormPositionFields'
import Form from 'components/form/Form'
import Container from 'components/container/Container'
import initialState from 'tests/initialStoreMock'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

configure({ adapter: new Adapter() })
const mockStore = configureStore()

describe('<Position />', () => {
  let store
  let component

  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    localStorage.setItem('user', '{"test":"ok"}')

    const coachForEdit = {
      positions: [null],
    }
    component = (
      <Provider store={store}>
        <Form onSubmit={() => {}} initialValues={coachForEdit}>
          <Container title="Должности">
            <Position
              allowToSelectPosition
              positions={[
                { id: '0', title: 'Pos1', type: 'MANAGER' },
                { id: '1', title: 'Pos2', type: 'SPORT' },
              ]}
            />
          </Container>
        </Form>
      </Provider>
    )
  })

  it('Should render correctly', () => {
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should change discipline on sport select', () => {
    const wrapper = mount(component)
    const content = wrapper.find('.dropdown-content')

    const sportItems = content.at(0).find('button')
    const hockeyButton = sportItems.at(0)
    const soccerButton = sportItems.at(1)
    const discButton = content.at(1).find('button')

    // given
    expect(discButton.text()).toBe('Любая дисциплина')
    expect(hockeyButton.text()).toBe('Хоккей')
    expect(soccerButton.text()).toBe('Футбол')

    const checkDisciplineItems = expectedItems => {
      wrapper.update()
      const discItems = wrapper
        .find('.dropdown-content')
        .at(1)
        .find('button')
      discItems.forEach((item, index) =>
        expect(item.text()).toBe(expectedItems[index])
      )
    }

    // when click on soccer
    soccerButton.simulate('click')
    checkDisciplineItems(['Любая дисциплина', 'футбол'])

    // when click on hockey
    hockeyButton.simulate('click')
    checkDisciplineItems(['Любая дисциплина', 'хоккей'])
  })

  it('Should render positions from props', () => {
    const wrapper = mount(component)
    const content = wrapper.find('.dropdown-content')
    const positionButtons = content.at(2).find('button')
    const pos1 = positionButtons.at(0)
    const pos2 = positionButtons.at(1)

    expect(pos1.text()).toBe('Pos1')
    expect(pos2.text()).toBe('Pos2')
  })
})
