import { RowModel, createRowModel } from './rowModel'
import { DBType } from '../utils/db'

export interface Models {
  readonly rowModel: RowModel
}

export function createModels(db: DBType): Models {
  return Object.freeze({
    rowModel: createRowModel(db),
  })
}
