import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders welcome', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Welcome to your coding exercise, fill in your submission here.../i)
  expect(linkElement).toBeInTheDocument()
})
