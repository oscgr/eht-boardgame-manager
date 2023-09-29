<script setup lang="ts">
import useBoardgames from '@/stores/boardgames'
import CreateDialog from '@/components/CreateDialog.vue'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { sortBy } from 'lodash-es'

const { data, isLoading, isFinished } = useBoardgames()
const sort = useLocalStorage('sort', 'name')

const filteredAndSortedData = computed(() => {
  return sortBy(data.value, sort.value)
})
</script>

<template>
  <header>
    <h1 style="text-align: center; padding-top: 3rem">Gameboard manager</h1>
    <br />
    <h6 style="text-align: center; padding: 0 3rem">@ehtrace</h6>
  </header>
  <main class="flex justify-content-center" style="min-height: 100vh; align-items: center">
    <div class="nes-table-responsive" style="padding: 5rem">
      <table class="nes-table is-bordered is-centered" style="min-width: 900px">
        <thead>
          <tr>
            <th>
              <div class="nes-field">
                <div class="flex">
                  <label for="name">Nom du jeu</label
                  ><span v-show="sort === 'name'" style="padding-left: 1rem" v-text="'&Hat;'" />
                </div>
                <input autofocus type="text" id="name" class="nes-input" />
              </div>
            </th>
            <th>
              <div class="nes-field">
                <label for="owner">Propriétaire</label>
                <input type="text" id="owner" class="nes-input" />
              </div>
            </th>
            <th>
              <div class="nes-field">
                <label for="lent_to">Prêté à</label>
                <input type="text" id="lent_to" class="nes-input" />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!isLoading && isFinished && !data?.length">
            <td colspan="4" style="height: 90px; text-align: center">Aucun jeu enregistré</td>
          </tr>
          <tr v-else-if="isLoading && !isFinished">
            <td colspan="4" style="height: 90px; text-align: center">
              <progress class="nes-progress" value="90" max="100"></progress>
            </td>
          </tr>
          <tr v-for="boardgame in filteredAndSortedData" :key="boardgame.id">
            <td v-text="boardgame.name"></td>
            <td v-text="boardgame.owner"></td>
            <td v-text="boardgame.lent_to"></td>
            <td>
              <a
                class="nes-btn"
                target="_blank"
                v-show="boardgame.lent_to"
                :href="boardgame.lent_to"
                style="white-space: nowrap"
                >+ d'infos</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Dialog -->
    <CreateDialog />
  </main>
</template>
