import axios from 'axios'
import { ref } from 'vue'

export interface Boardgame {
  id: number
  name: string
  owner: string
  lent_to: string
  bgg_url: string
}

const boardgames = ref<Boardgame[]>([])

const useBoardgames = () => {
  const reload = async () => {
    const { data } = await axios.get<Boardgame[]>('/api/boardgames')
    boardgames.value = data
  }
  const create = async (toSave: Boardgame) => {
    await axios.post('/api/boardgames', toSave)
    await reload()
  }
  const patch = async (toSave: Partial<Omit<Boardgame>>) => {
    await axios.patch('/api/boardgames/' + toSave.id, toSave)
    await reload()
  }

  return {
    create,
    reload,
    boardgames,
    patch
  }
}

export default useBoardgames
