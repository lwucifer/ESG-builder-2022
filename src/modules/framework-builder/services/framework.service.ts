import http from '@/plugins/axios'
import { AxiosResponse } from 'axios'
import { TodoFixMe } from '@/types/common'

type Dimension = {
  icon: string
  text: string
  color: string
  new: string | number | null | boolean
  name: string
  code: string
  iconShow: string
  colorShow: string
}

class FrameworkService {
  async uploadFile(
    fileData: string | File | null | undefined,
    type: string
  ): Promise<AxiosResponse<TodoFixMe>> {
    const formData = new FormData()
    if (fileData) formData.append('file', fileData)
    if (type) formData.append('type', type)
    return await http.post<FormData, AxiosResponse<TodoFixMe>>(
      `custom-framework-file/upload-custom-framework-file`,
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
    )
  }

  async downloadSampleFile(
    type: string,
    versionId: string
  ): Promise<AxiosResponse<TodoFixMe>> {
    let url = ''
    url =
      type.toLowerCase() === 'dimension'
        ? `custom-framework-versions/${versionId}/dimension/download-sample-file`
        : `/custom-framework-structure/download-sample-file/?type=${type}`
    return http.get(url, {
      responseType: 'blob' // important
    })
  }

  async saveDimensions(payload: Dimension[], versionId: string) {
    return http.post(
      `/custom-framework-versions/${versionId}/dimension`,
      payload
    )
  }

  async getDimensionList(versionId: string) {
    return http.get(`custom-framework-versions/${versionId}/dimension`)
  }

  async getFrameworkById(id: string) {
    return http.get(`custom-frameworks/${id}`)
  }

  uploadExcel(
    payload: FormData,
    routingTarget: string,
    frameworkVersionId: string,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ) {
    return http.post(
      `/custom-framework-versions/${frameworkVersionId}/${routingTarget}/upload`,
      payload,
      {
        headers: {
          'Content-type': 'multipart/form-data'
        },
        onUploadProgress: onUploadProgress
      }
    )
  }
}

export default new FrameworkService()
