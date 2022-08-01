export interface DataRow {
  id: number
  value: string
  timestamp: string
}

export type Data = ReadonlyArray<DataRow>

export interface GetRowsResponse {
  rows: Data
}

export interface CreateRowPostBody {
  value: string
}
