import { ref } from 'vue'
import useRest from '@/utils/rest'
import type { PartialNull } from '@/utils/typescript'

export interface Boardgame {
  id: number
  name: string
  owner: string
  lent_to: string
  bgg_url: string
}

const boardgames = ref<Boardgame[]>([])

const useBoardgames = () => {
  const {
    query,
    create: createREST,
    patch: patchREST,
    del: delREST
  } = useRest<Boardgame>('/api/boardgames')
  const reload = async () => {
    boardgames.value = await query()
  }

  const create = async (toSave: Boardgame) => {
    await createREST({ data: toSave })
    await reload()
  }
  const patch = async (toSave: PartialNull<Boardgame>) => {
    await patchREST(toSave.id, { data: toSave })
    await reload()
  }
  const del = async (id: number) => {
    await delREST(id)
    await reload()
  }

  return {
    create,
    reload,
    boardgames,
    patch,
    del
  }
}

export default useBoardgames
