import useLoader from '@/stores/loader'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const useRest = <T>(baseURL: string) => {
  const { setLoading } = useLoader()
  const call = async <D>(
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    config: AxiosRequestConfig
  ): Promise<D> => {
    setLoading(true)
    try {
      const { data } = await axios<D>({
        method,
        url,
        baseURL,
        ...config
      })
      return data
    } finally {
      setLoading(false)
    }
  }
  return {
    async query(config: AxiosRequestConfig) {
      return await call<T[]>('get', '', config)
    },
    async get(id: string, config: AxiosRequestConfig) {
      return await call<T>('get', `/${id}`, config)
    },
    async create(config: AxiosRequestConfig<T>) {
      return await call<T>('post', '', config)
    },
    async patch(id: string, config: AxiosRequestConfig<Partial<T>>) {
      return await call<Partial<T>>('patch', `/${id}`, config)
    },
    async del(id: string, config: AxiosRequestConfig) {
      await call<void>('delete', `/${id}`, config)
    }
  }
}

export default useRest
