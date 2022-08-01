import React from 'react'
import { Dashboard } from './containers/Dashboard'

const REST_API_BASE_URL = process.env.REACT_APP_REST_API_BASE_URL || ''

function App(): JSX.Element {
  return (
    <>
      <h1>Test App</h1>
      <main>
        <Dashboard baseUrl={REST_API_BASE_URL} />
      </main>
    </>
  )
}

export default App
