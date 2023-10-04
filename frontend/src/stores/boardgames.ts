import { computed, ref } from 'vue'
import useRest from '@/utils/rest'
import type { PartialNull } from '@/utils/typescript'
import { useLocalStorage } from '@vueuse/core'
import { deburr, lowerCase } from 'lodash-es'

export interface Boardgame {
  id: number
  name: string
  owner: string
  lent_to: string
  bgg_url: string
  is_new: boolean
}

const q = ref('')
const boardgames = ref<Boardgame[]>([])
const locallySavedBoardgames = useLocalStorage<number[]>('saved_boardgames', [])

const useBoardgames = () => {
  const {
    query,
    create: createREST,
    patch: patchREST,
    del: delREST
  } = useRest<Boardgame>('/api/boardgames')

  const filteredBoardgames = computed(() => {
    if (q.value === '') return boardgames.value

    const _q = lowerCase(deburr(q.value))
    return boardgames.value.filter((b) => {
      if (lowerCase(deburr(b.name)).includes(_q)) return true
      if (lowerCase(deburr(b.owner)).includes(_q)) return true
      if (lowerCase(deburr(b.lent_to)).includes(_q)) return true
      return false
    })
  })
  const reload = async () => {
    boardgames.value = (await query()).map((v) => ({
      ...v,
      is_new: !locallySavedBoardgames.value.some((bg) => bg === v.id)
    }))
    locallySavedBoardgames.value = boardgames.value.map(({ id }) => id)
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
    del,
    q,
    filteredBoardgames
  }
}

export default useBoardgames
