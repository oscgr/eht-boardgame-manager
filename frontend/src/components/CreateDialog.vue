<template>
  <button
    type="button"
    class="nes-btn is-primary"
    onclick="document.getElementById('dialog-creation').showModal()"
  >
    Ajouter un jeu +
  </button>
  <dialog class="nes-dialog" id="dialog-creation" ref="dialog-creation">
    <form method="dialog" novalidate @submit="save">
      <p class="title">Ajout d'un jeu</p>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label for="name_creation">Nom</label>
        <input v-model="boardgame.name" type="text" id="name_creation" class="nes-input" />
      </div>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label for="owner_creation">Propriétaire</label>
        <input v-model="boardgame.owner" type="text" id="owner_creation" class="nes-input" />
      </div>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label for="owner_creation">Lien BoardGameGeek</label>
        <input v-model="boardgame.bgg_url" type="text" id="bgg_url_creation" class="nes-input" />
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

const dialogCreation = ref<HTMLDialogElement>()
const boardgame = ref<Partial<Boardgame>>({})

const { create } = useBoardgames()

const save = async () => {
  if (!boardgame.value.bgg_url || !boardgame.value.name || !boardgame.value.owner) return
  await create(boardgame.value as Boardgame)
  dialogCreation.value?.close()
  boardgame.value = {}
}
</script>
