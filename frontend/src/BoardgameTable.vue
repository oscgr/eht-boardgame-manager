<template>
  <Transition type="transition" appear name="fade">
    <div class="nes-table-responsive" style="padding: 0 5rem 0 5rem" v-show="displayTable">
      <table class="nes-table is-bordered is-centered" style="min-width: 900px">
        <thead>
          <tr>
            <th>
              <div class="nes-field">
                <div class="flex">
                  <label style="display: none" for="name"></label>
                  <div class="nes-pointer" style="margin-bottom: 1rem" @click="sort = 'name'">
                    Nom du jeu
                  </div>
                  <span v-show="sort === 'name'" style="padding-left: 1rem" v-text="'&Hat;'" />
                </div>
                <input autofocus type="text" id="name" class="nes-input" />
              </div>
            </th>
            <th style="max-width: 300px">
              <div class="nes-field">
                <div class="flex">
                  <label style="display: none" for="owner"></label>
                  <div class="nes-pointer" style="margin-bottom: 1rem" @click="sort = 'owner'">
                    Propriétaire
                  </div>
                  <span v-show="sort === 'owner'" style="padding-left: 1rem" v-text="'&Hat;'" />
                </div>
                <input autofocus type="text" id="owner" class="nes-input" />
              </div>
            </th>
            <th style="max-width: 300px">
              <div class="nes-field">
                <div class="flex">
                  <label style="display: none" for="lent_to"></label>
                  <div class="nes-pointer" style="margin-bottom: 1rem" @click="sort = 'lent_to'">
                    Prêté à
                  </div>
                  <span v-show="sort === 'lent_to'" style="padding-left: 1rem" v-text="'&Hat;'" />
                </div>
                <input autofocus type="text" id="lent_to" class="nes-input" />
              </div>
            </th>
            <th style="max-width: 50px"></th>
          </tr>
        </thead>
        <tbody>
          <!--          <tr v-if="!isLoading && isFinished && !data?.length">-->
          <!--            <td colspan="4" style="height: 90px; text-align: center">Aucun jeu enregistré</td>-->
          <!--          </tr>-->
          <!--          <tr v-else-if="isLoading && !isFinished">-->
          <!--            <td colspan="4" style="height: 90px; text-align: center">-->
          <!--              <progress class="nes-progress" value="90" max="100"></progress>-->
          <!--            </td>-->
          <!--          </tr>-->
          <tr v-for="boardgame in filteredAndSortedBoardgames" :key="boardgame.id">
            <td>
              <span
                class="nes-text"
                :class="{ 'is-error': !!boardgame.lent_to }"
                v-text="boardgame.name"
              />
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
                    v-show="!!boardgame.lent_to"
                    type="button"
                    style="margin-left: 1rem"
                    class="nes-btn is-error"
                    v-text="'x'"
                    @click="open"
                  />
                </template>
              </ConfirmAction>

              <button
                v-show="!boardgame.lent_to"
                type="button"
                class="nes-btn is-primary is-rounded"
              >
                +
              </button>
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
import useBoardgames from '@/stores/boardgames'
import md5 from 'crypto-js/md5'
import { useLocalStorage } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { sortBy } from 'lodash-es'
import ConfirmAction from '@/components/ConfirmAction.vue'

const displayTable = ref(false)
const { boardgames, reload, patch } = useBoardgames()
const sort = useLocalStorage('sort', 'name')

const filteredAndSortedBoardgames = computed(() => {
  return sortBy(boardgames.value, sort.value)
})

const getGravatarImageUrl = (user: string) => {
  return 'https://www.gravatar.com/avatar/' + md5(user + '@ehtrace.com') + '?d=retro'
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
