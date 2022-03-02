import http from '@/plugins/axios'
import { Dimension } from '@/types/common'

class DimensionService {
  async getDimensionList(versionId: string) {
    return http.get(`custom-framework-versions/${versionId}/dimension`)
  }

  async saveDimensions(payload: Dimension[], versionId: string) {
    return http.post(
      `custom-framework-versions/${versionId}/dimension`,
      payload
    )
  }

  async updateDimensions(payload: Dimension[], versionId: string) {
    return http.put(`custom-framework-versions/${versionId}/dimension`, payload)
  }

  async getDimensionPresets() {
    return http.get(`preset-dimensions`)
  }

  async deleteDimension(versionId: string, dimensionId: string | number) {
    return http.delete(
      `custom-framework-versions/${versionId}/dimension/${dimensionId}`
    )
  }
}

export default new DimensionService()
