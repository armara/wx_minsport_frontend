import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Form from 'components/form/Form'
import FormField from 'components/form/formField/FormField'

configure({ adapter: new Adapter() })

describe('<FormField />', () => {
  it('renders correctly default props', () => {
    const tree = renderer
      .create(
        <Form onSubmit={() => {}} validate={() => {}}>
          <FormField
            isRequired
            label="Тип организации"
            id="type"
            name="type"
            inputProps={{
              menuId: 'foundation-type_dropdown',
              items: [{ id: 1, item: 'Все типы организаций' }],
            }}
          />
        </Form>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
