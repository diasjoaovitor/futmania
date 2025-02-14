import '@testing-library/jest-dom'

import { TextDecoder, TextEncoder } from 'node:util'

import { enableFetchMocks } from 'jest-fetch-mock'

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder
}

if (!global.TextDecoder) {
  ;(global as any).TextDecoder = TextDecoder
}

enableFetchMocks()
