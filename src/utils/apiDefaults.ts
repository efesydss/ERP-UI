import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { apiRoutes } from '@/utils/apiRoutes'

export const backendURL = import.meta.env.VITE_BACKEND_ENDPOINT

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface Pagination {
  totalCount: number
  pageSize: number
  currentPage: number
  totalPages: number
}

export interface ApiResponse<T> {
  results: T[]
  pagination: Pagination
}

if (!backendURL) {
  console.error('BACKEND_ENDPOINT must be set. Please copy .env.dist to .env')
}

//todo: temp solution for cors, based on the changes at vite.config
export const axiosBase = axios.create({
  withCredentials: true,
  baseURL: '/api'
})

export const apiRequest = async <T>(url: string, method: HttpMethod = 'GET', data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await axiosBase({
    url,
    method,
    data,
    ...config
  })
  return response.data
}

export interface TokenResponse {
  accessToken: string
}

export let tokenGlobal: string | undefined = undefined

export const getRefreshToken = async () => {
  if (tokenGlobal) {
    return tokenGlobal
  }

  try {
    const refreshedToken = await axiosBase.post<TokenResponse>(apiRoutes.refresh)

    return refreshedToken.data.accessToken
  } catch (err) {
    console.error('error getRefreshToken', err)
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
  return axiosBase.post<TokenResponse>('/public/refresh').then((tokenRefreshResponse: AxiosResponse<TokenResponse>) => {
    const newAccessToken = tokenRefreshResponse.data.accessToken
    setAuthToken(newAccessToken)

    if (failedRequest.response && failedRequest.response.config) {
      failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`
    }
    return Promise.resolve()
  })
}

createAuthRefreshInterceptor(axiosBase, refreshAuth)
