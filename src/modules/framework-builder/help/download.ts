import { TodoFixMe } from '@/types/common'
import axios, { AxiosError, AxiosResponse } from 'axios'

export function transformData<T>(promise: Promise<AxiosResponse<T>>) {
  const data = promise.then(
    (val: AxiosResponse<T>) => [null, val.data] as [null, T],
    (err: AxiosError) => [err, null] as [AxiosError, null]
  )
  return data
}

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

export function downloadSampleFile(type: string): Promise<TodoFixMe> {
  return transformData(
    service({
      method: 'get',
      url: `custom-framework-structure/download-sample-file/?type=${type.replace(
        /\s/g,
        ''
      )}`
    })
  )
}
