import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Data, GetRowsResponse, CreateRowPostBody } from '../types/rows'

const GET_ROWS_ENDPOINT = 'v1/rows'
const POST_ROWS_ENDPOINT = 'v1/rows'

interface DashboardProps {
  readonly baseUrl: string
}

export function Dashboard({ baseUrl }: DashboardProps): JSX.Element {
  const [data, setData] = useState<Data>([])
  const [newValue, setNewValue] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData(): Promise<void> {
    try {
      const response = await fetch(`${baseUrl}/${GET_ROWS_ENDPOINT}`)
      const responseJson: GetRowsResponse = await response.json()
      setData(responseJson.rows)
    } catch (e) {
      console.error('Error fetching data:', e)
    }
  }

  async function insertData(value: string): Promise<void> {
    const postBody: CreateRowPostBody = { value }
    try {
      await fetch(`${baseUrl}/${POST_ROWS_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      })
    } catch (e) {
      console.error('Error posting data:', e)
    }
    fetchData() // refresh
  }

  const handleChangeNewValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value)
  }

  const handleSubmitNewValue = (event: SyntheticEvent) => {
    event.preventDefault()
    const cleanedValue = newValue.trim()
    if (cleanedValue) {
      insertData(cleanedValue)
    }
    setNewValue('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 20 }}>
        <form onSubmit={handleSubmitNewValue}>
          <div>
            <input
              type="text"
              name="Add Value"
              placeholder="New value"
              value={newValue}
              onChange={handleChangeNewValue}
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <h3>Data:</h3>
      {data.map((row, i) => (
        <p key={row.id}>
          {i + 1}. {JSON.stringify(row, null, 2)}
        </p>
      ))}
    </div>
  )
}
