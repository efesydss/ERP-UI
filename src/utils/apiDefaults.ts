import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { apiRoutes } from '@/utils/apiRoutes'
import { CustomAxiosRequestConfig } from 'axios-auth-refresh/dist/utils'

export const backendURL = import.meta.env.VITE_BACKEND_ENDPOINT

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestConfig {
  endpoint: keyof typeof apiRoutes
  method?: HttpMethod
  payload?: any
  headers?: AxiosHeaders
  id?: number
}

export interface ApiResponse<T> {
  data: T[]
  pageSize: number
  page: number
  total: number
}

if (!backendURL) {
  console.error('BACKEND_ENDPOINT must be set. Please copy .env.dist to .env')
}

//todo: temp solution for cors, based on the changes at vite.config
export const axiosBase = axios.create({
  withCredentials: true,
  baseURL: '/api'
})

export const apiRequest = async <T>(options: RequestConfig): Promise<T> => {
  const { endpoint, payload, method = 'POST', headers = new AxiosHeaders(), id } = options

  let url = apiRoutes[endpoint]

  if (id) {
    url = `${url}/${id}`
  }

  const params: AxiosRequestConfig = {
    url,
    method,
    data: payload,
    headers
  }

  const response: AxiosResponse<T> = await axiosBase(params)
  return response.data
}

export interface TokenResponse {
  token: string
}

export let tokenGlobal: string | undefined = undefined

export const getRefreshToken = async () => {
  if (tokenGlobal) {
    return tokenGlobal
  }

  try {
    const refreshedToken = await axiosBase.post<TokenResponse>(apiRoutes.userRefresh)

    return refreshedToken.data.token
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.info((err as AxiosError).message)
    } else {
      console.error('An unexpected error occurred', err)
    }
  }
}

export const setAuthToken = (token: string | undefined) => {
  tokenGlobal = token
  if (token) {
    axiosBase.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosBase.defaults.headers.common['Authorization']
  }
}

export const refreshAuth = async (failedRequest: AxiosError) => {
  return axiosBase.post<TokenResponse>(apiRoutes.userRefresh).then((tokenRefreshResponse: AxiosResponse<TokenResponse>) => {
    const newAccessToken = tokenRefreshResponse.data.token
    setAuthToken(newAccessToken)

    if (failedRequest.response && failedRequest.response.config) {
      failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`
    }
    return Promise.resolve()
  })
}

export const skipRefreshAuth: CustomAxiosRequestConfig = {
  skipAuthRefresh: true
}

createAuthRefreshInterceptor(axiosBase, refreshAuth)
