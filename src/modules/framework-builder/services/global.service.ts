import http from '@/plugins/axios'
import { CustomFramework } from '@/types/custom-framework'
import { AxiosResponse } from 'axios'

type GlobalParameter = {
  frameworkName: string
  code: string
  hoverText: string
  glossary?: Glossary
}

type Glossary = {
  linkText: string
  file: string
  linkUrl: string
}

type omission = {
  title: string
}

type option = {
  name: string
  description: string
}

type CreateFrameworkRequestDto = {
  frameworkTypeAndLogoInformation: {
    type: string
    logoFileId: string
    logoThumbnailFileId: string
    glossaryEnabled: boolean
  }
  frameworkInformation: {
    name: string
    code: string
    hoverText: string
  }
  glossaryInformation: {
    glossaryUrlText: string
    glossaryExternalUrl?: string
    glossaryFileId?: string
    glossaryType: string
  }
  omissionInformation: {
    omissionTexts: omission[]
    omissionOptions: option[]
  }
}

class GlobalParameterService {
  getFramework(filterBy: string) {
    return http.get(`/custom-framework-versions?filterBy=${filterBy}`)
  }

  uploadExcel(
    payload: FormData,
    fileType: string,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ) {
    return http.post(`/custom-framework-${fileType}`, payload, {
      headers: {
        'Content-type': 'multipart/form-data'
      },
      onUploadProgress: onUploadProgress
    })
  }

  downloadUomExcel() {
    return http.get(`/custom-framework-uom/download`, {
      responseType: 'blob' // important
    })
  }

  downloadFieldsExcel() {
    return http.get('/custom-framework-field/download', {
      responseType: 'blob'
    })
  }

  createFramework(framework: CreateFrameworkRequestDto) {
    return http.post<
      CreateFrameworkRequestDto,
      Promise<AxiosResponse<CustomFramework>>
    >('/custom-frameworks', framework)
  }

  updateFramework(framework: CreateFrameworkRequestDto) {
    return http.put<
      CreateFrameworkRequestDto,
      Promise<AxiosResponse<CustomFramework>>
    >('/custom-frameworks', framework)
  }

  getFileType(fileType: string) {
    return http.get(`/custom-framework-file?file-type=${fileType}`)
  }

  isUploadedData() {
    return http.get('/custom-frameworks/check-upload-completed')
  }
}
export default new GlobalParameterService()
