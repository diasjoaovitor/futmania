import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

const original = console.error

beforeEach(() => {
  console.error = jest.fn()
})

afterEach(() => {
  console.error = original
})
