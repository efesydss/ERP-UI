import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { apiRoutes } from '@/utils/apiRoutes'
import { CustomAxiosRequestConfig } from 'axios-auth-refresh/dist/utils'

export const backendURL = import.meta.env.VITE_BACKEND_ENDPOINT

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestConfig<TRequest = unknown> {
  endpoint: string
  method?: HttpMethod
  payload?: TRequest
  headers?: AxiosRequestConfig['headers']
  id?: number
  params?: Record<string, string>
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

export const apiRequest = async <TResponse, TRequest = unknown>(options: RequestConfig<TRequest>): Promise<TResponse> => {
  const { endpoint, payload, method = 'POST', headers = new AxiosHeaders(), id, params } = options


//todo: temp until we migrate to orval
  let url = endpoint.startsWith('/api') ? endpoint.replace(/^\/api/, '') : apiRoutes[endpoint as keyof typeof apiRoutes]

  if (id) {
    url = `${url}/${id}`
  }

  if (params) {
    for (const key in params) {
      url = url.replace(`{${key}}`, params[key])
    }
  }

  const axiosParams: AxiosRequestConfig = {
    url,
    method,
    data: payload,
    headers
  }

  const response: AxiosResponse<TResponse> = await axiosBase(axiosParams)
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
    return undefined
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
  try {
    const tokenRefreshResponse = await axiosBase.post<TokenResponse>(apiRoutes.userRefresh)
    const newAccessToken = tokenRefreshResponse.data.token
    setAuthToken(newAccessToken)

    if (failedRequest.response?.config) {
      failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`
    }

    return Promise.resolve(newAccessToken)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      setAuthToken(undefined)
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
}

export const skipRefreshAuth: CustomAxiosRequestConfig = {
  skipAuthRefresh: true
}

createAuthRefreshInterceptor(axiosBase, refreshAuth)
