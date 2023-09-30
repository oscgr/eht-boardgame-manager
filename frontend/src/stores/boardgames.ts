import { ref } from 'vue'
import useRest from '@/utils/rest'

export interface Boardgame {
  id: number
  name: string
  owner: string
  lent_to: string
  bgg_url: string
}

const boardgames = ref<Boardgame[]>([])

const useBoardgames = () => {
  const { query, create: createREST, patch: patchREST } = useRest<Boardgame>('/api/boardgames')
  const reload = async () => {
    boardgames.value = await query()
  }

  const create = async (toSave: Boardgame) => {
    await createREST({ data: toSave })
    await reload()
  }
  const patch = async (toSave: Partial<Boardgame>) => {
    await patchREST(toSave.id, { data: toSave })
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
