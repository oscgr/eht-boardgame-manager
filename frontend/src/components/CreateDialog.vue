<template>
  <button type="button" class="nes-btn is-primary" @click="open">Ajouter un jeu +</button>
  <dialog class="nes-dialog" id="dialog-creation" ref="dialogCreation">
    <form method="dialog" novalidate @submit.prevent="save">
      <p class="title">Ajout d'un jeu</p>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label for="name_creation">Nom</label>
        <input v-model="boardgame.name" required type="text" id="name_creation" class="nes-input" />
      </div>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label for="owner_creation">Propriétaire</label>
        <input
          v-model="boardgame.owner"
          minlength="3"
          maxlength="3"
          required
          type="text"
          id="owner_creation"
          class="nes-input"
        />
      </div>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label for="owner_creation"
          >Lien <a href="https://boardgamegeek.com/" target="_blank">BoardGameGeek</a></label
        >
        <input v-model="boardgame.bgg_url" type="url" id="bgg_url_creation" class="nes-input" />
      </div>
      <menu class="dialog-menu">
        <button
          type="reset"
          class="nes-btn"
          onclick="document.getElementById('dialog-creation').close()"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="nes-btn is-primary"
          :class="{ 'is-disabled': !boardgame.name || !boardgame.owner }"
        >
          OK
        </button>
      </menu>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Boardgame } from '@/stores/boardgames'
import useBoardgames from '@/stores/boardgames'
import { useLocalStorage } from '@vueuse/core'

const dialogCreation = ref<HTMLDialogElement>()
const boardgame = ref<Partial<Boardgame>>({})

const { create } = useBoardgames()
const me = useLocalStorage('me', null)

const save = async () => {
  if (!boardgame.value.bgg_url || !boardgame.value.name || !boardgame.value.owner) return
  await create(boardgame.value as Boardgame)
  dialogCreation.value?.close()
  boardgame.value = {}
}

const open = () => {
  boardgame.value.owner = me.value || ''
  dialogCreation.value?.showModal()
}
</script>
