export interface IStorageReducer {
  currentFile?: File,
  uploadStatus?: IUploadStatus,
}

export interface IUploadStatus {
  type: "default"|"error"|undefined,
  header: string,
  description: string
}