export interface CustomFramework {
  id: string
  name: string
  glossaryType: string
  glossaryExternalUrl: string
  glossaryUrlText: string
  type: string
  code: string
  hoverText: string
  logoFileId: string
  logoThumbnailFileId: string
  glossaryFileId?: string
  status: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: string
  customFrameworkFiles: CustomFrameworkFile[]
  customFrameworkOmissionTextList: CustomFrameworkOmissionTextList[]
  customFrameworkReasonOfOmissionList: CustomFrameworkReasonOfOmissionList[]
  customFrameworkVersions: CustomFrameworkVersion[]
}

export interface CustomFrameworkFile {
  id: string
  customFrameworkId: string
  type: string
  fileName: string
  blobName: string
  createdAt: Date
  updatedAt: Date
}

export interface CustomFrameworkOmissionTextList {
  id: string
  title: string
}

export interface CustomFrameworkReasonOfOmissionList {
  id: string
  name: string
  description: string
}

export interface CustomFrameworkVersion {
  id: string
  versionNumber: number
  customFrameworkId: string
  publishedAt?: string
  deletedAt?: string
}
