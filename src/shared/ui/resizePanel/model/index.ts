export interface IResizePanel {
  id?: string,
  nav?: string,
  header?: React.ReactNode|string,
  before?: React.ReactNode|boolean,
  after?: React.ReactNode|boolean,
  children?: React.ReactNode
}