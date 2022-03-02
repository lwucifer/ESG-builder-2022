// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TodoFixMe = any

//* Sync to obj at stxForms
export type Timeout = number | undefined | TodoFixMe

export type ReqUrl = { method: string; path: string }

export type SnackConfig = {
  top?: boolean
  right?: boolean
  width?: number
}

export type Themes = {
  [key: string]: {
    card: string
    progress: string
    text: string
  }
}

export type Dimension = {
  icon: string
  color: string
  new?: string | number | null | boolean
  name: string
  code: string
  hide?: boolean | number
  id?: number | string
}

export type DimensionCustom = {
  icon: string
  color: string
  name: string
  code: string
  id?: number | string
}

export type NodeData = {
  id: string
  parentId: string
  type: string
  hide: boolean
  deletedAt: string | null
  customFrameworkVersionId: string
  metaDataId: string
  createdAt: string
  updatedAt: string
  metaData: DimensionCustom
}

export type Framework = {
  frameworkName: string
  code: string
  hoverText: string
  glossary?: Glossary
}

export type Glossary = {
  linkText: string
  file: string
  linkUrl: string
}
