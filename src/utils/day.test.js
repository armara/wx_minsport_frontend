import { currentDay } from './day'
import { stubCurrentDay } from './__mocks__/day'

jest.mock('./day')

it('should use mock of currentDay', () => {
  expect(currentDay).toEqual(stubCurrentDay)
})

it('should use mock of currentDay with same type', () => {
  expect(typeof currentDay).toEqual(typeof stubCurrentDay)
})
