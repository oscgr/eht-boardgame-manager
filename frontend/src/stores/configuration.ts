import { ref } from 'vue'
import axios from 'axios'

type ConfigurationKey = 'work_name' | 'work_domain'
const configuration = ref<Partial<Record<ConfigurationKey, string>>>({})
const useConfiguration = () => {
  const getConfiguration = async () => {
    const { data } = await axios.get<Record<ConfigurationKey, string>>('/api/configuration')
    configuration.value = data
  }
  return {
    getConfiguration,
    configuration
  }
}

export default useConfiguration
