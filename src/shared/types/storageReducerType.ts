import { XMLValidator } from "./parser"

export interface IStorageReducer {
  currentFile?: File,
  uploadStatus?: IUploadStatus,
  result?: XMLValidator
}

export interface IUploadStatus {
  type: "default"|"error"|undefined,
  header: string,
  description: string
}