<template>
  <Transition type="transition" appear name="fade">
    <div class="nes-table-responsive" v-show="displayTable">
      <table class="nes-table is-bordered is-centered" style="min-width: 99%">
        <thead>
          <tr>
            <th @click="sort = 'name'" class="nes-pointer">
              Nom du jeu
              <span v-show="sort === 'name'" style="padding-left: 1rem" v-text="'&Hat;'" />
            </th>
            <th @click="sort = 'owner'" class="nes-pointer">
              Propriétaire
              <span v-show="sort === 'owner'" style="padding-left: 1rem" v-text="'&Hat;'" />
            </th>
            <th @click="sort = 'lent_to'" class="nes-pointer">
              Prêté à
              <span v-show="sort === 'lent_to'" style="padding-left: 1rem" v-text="'&Hat;'" />
            </th>
            <th style="width: 200px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!boardgames?.length">
            <td colspan="4" style="height: 90px; text-align: center">Aucun jeu enregistré</td>
          </tr>
          <tr v-else-if="!filteredBoardgames?.length">
            <td colspan="4" style="height: 90px; text-align: center">
              Aucun jeu trouvé ({{ boardgames?.length }} cachés)
            </td>
          </tr>

          <tr v-for="boardgame in filteredAndSortedBoardgames" :key="boardgame.id">
            <td>
              <div
                class="nes-badge"
                style="width: 50px; margin-right: 30px; vertical-align: middle"
                v-show="boardgame.is_new"
              >
                <span class="is-warning">new</span>
              </div>

              <span
                class="nes-text"
                :class="{ 'is-error': !!boardgame.lent_to }"
                v-text="boardgame.name"
              >
              </span>
              <ConfirmAction @ok="() => del(boardgame.id)">
                <template #default="{ open }">
                  <button
                    v-show="boardgame.owner === me"
                    type="button"
                    style="margin-left: 1rem"
                    class="nes-btn is-error"
                    v-text="'x'"
                    @click="open"
                  />
                </template>
              </ConfirmAction>
            </td>
            <td>
              <img
                class="nes-avatar is-medium"
                alt="Gravatar image example"
                :src="getGravatarImageUrl(boardgame.owner)"
                style="image-rendering: pixelated"
              />
              <span style="margin-left: 1rem" v-text="boardgame.owner"></span>
            </td>
            <td>
              <img
                v-show="boardgame.lent_to"
                class="nes-avatar is-medium"
                alt="Gravatar image example"
                :src="getGravatarImageUrl(boardgame.lent_to)"
                style="image-rendering: pixelated"
              />
              <span style="margin-left: 1rem" v-text="boardgame.lent_to"></span>
              <ConfirmAction @ok="() => patch({ id: boardgame.id, lent_to: null })">
                <template #default="{ open }">
                  <button
                    v-show="
                      !!boardgame.lent_to && (boardgame.lent_to === me || boardgame.owner === me)
                    "
                    type="button"
                    style="margin-left: 1rem"
                    class="nes-btn is-error"
                    v-text="'x'"
                    @click="open"
                  />
                </template>
              </ConfirmAction>

              <AddLendingDialog :boardgame="boardgame" />
            </td>
            <td>
              <a
                class="nes-btn"
                target="_blank"
                v-show="boardgame.bgg_url"
                :href="boardgame.bgg_url"
                style="white-space: nowrap"
                >+ d'infos</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import useBoardgames, { Boardgame } from '@/stores/boardgames'
import md5 from 'crypto-js/md5'
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { sortBy } from 'lodash-es'
import ConfirmAction from '@/components/ConfirmAction.vue'
import AddLendingDialog from '@/components/AddLendingDialog.vue'
import useConfiguration from '@/stores/configuration'

const displayTable = ref(false)
const { boardgames, filteredBoardgames, reload, patch, del } = useBoardgames()
const sort = useLocalStorage('sort', 'name')
const me = useLocalStorage('me', null)
const { configuration } = useConfiguration()

const filteredAndSortedBoardgames = computed<Boardgame[]>(() => {
  return sortBy(filteredBoardgames.value, (b) => b[sort.value]?.toLowerCase())
})

// todo refact
const getGravatarImageUrl = (user: string) => {
  return (
    'https://www.gravatar.com/avatar/' +
    md5(user + '@' + configuration.value.work_domain) +
    '?d=retro'
  )
}

onMounted(() => {
  reload()
  setTimeout(() => {
    displayTable.value = true
  }, 300)
})
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
