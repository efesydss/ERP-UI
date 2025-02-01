import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosBase } from '@/utils/apiDefaults'

export interface MutatorConfig extends AxiosRequestConfig {
  url: string
  method: AxiosRequestConfig['method']
  data?: unknown
}

export const customMutator = async <TData = unknown>(
  config: MutatorConfig
): Promise<TData> => {
  const response: AxiosResponse<TData> = await axiosBase(config)
  return response.data
}
