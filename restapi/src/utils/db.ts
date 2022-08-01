import { Pool } from 'pg'

class Db {
  private client!: Pool

  connect(connectionString: string) {
    this.client = new Pool({ connectionString })
  }

  /**
   * Query the database using the pool
   * @see https://node-postgres.com/features/pooling#single-query
   */
  async query(query: string, params?: any[]): Promise<any> {
    const { rows } = await this.client.query(query, params)
    return rows
  }
}

export const db = new Db()
export type DBType = typeof db
