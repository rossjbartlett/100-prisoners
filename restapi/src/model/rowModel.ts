import { Row } from '../types/row'
import { DBType } from '../utils/db'

const TABLE_NAME = 'test_table'

export interface RowModel {
  readonly getRows: () => Promise<readonly Row[]>
  readonly insertRow: (value: string) => Promise<void>
}

export function createRowModel(db: DBType): RowModel {
  async function insertRow(value: string): Promise<void> {
    await db.query(`INSERT INTO ${TABLE_NAME} (value) VALUES ($1)`, [value])
  }

  async function getRows(): Promise<readonly Row[]> {
    const rows = await db.query(`SELECT * FROM ${TABLE_NAME}`)
    return rows as readonly Row[]
  }

  return Object.freeze({
    insertRow,
    getRows,
  }) as RowModel
}
