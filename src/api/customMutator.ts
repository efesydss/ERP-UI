import { AxiosRequestConfig } from 'axios'
import { apiRequest, HttpMethod } from '@/utils/apiDefaults'

export const customMutator = async <T>(options: AxiosRequestConfig) => {
  return apiRequest<T>({
    endpoint: options.url || '',
    method: options.method as HttpMethod,
    payload: options.data,
    headers: options.headers
  })
}
