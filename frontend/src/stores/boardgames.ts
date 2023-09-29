import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'

export interface Boardgame {
  id: number
  name: string
  owner: string
  lent_to: string
  bgg_url: string
}

const useBoardgames = () => {
  const { data, isLoading, execute, isFinished } = useAxios<Boardgame[]>('/api/boardgames')

  const create = async (toSave: Boardgame) => {
    await axios.post('/api/boardgames', toSave)
    await execute()
  }
  return {
    data,
    isLoading,
    create,
    reload: execute,
    isFinished
  }
}

export default useBoardgames
