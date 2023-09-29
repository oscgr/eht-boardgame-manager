<template>
  <button
    type="button"
    class="nes-btn is-error"
    style="position: fixed; bottom: 10px; left: 10px"
    onclick="document.getElementById('dialog-creation').showModal()"
  >
    +
  </button>
  <dialog class="nes-dialog" id="dialog-creation">
    <form method="dialog" novalidate @submit="save">
      <p class="title">Ajout d'un jeu</p>
      <div class="nes-field">
        <label for="name_creation">Nom</label>
        <input v-model="boardgame.name" type="text" id="name_creation" class="nes-input" />
      </div>
      <div class="nes-field">
        <label for="owner_creation">Propriétaire</label>
        <input v-model="boardgame.owner" type="text" id="owner_creation" class="nes-input" />
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

const boardgame = ref<Boardgame>({})

const { create } = useBoardgames()

const save = async () => {
  await create(boardgame.value)
  boardgame.value = {}
}
</script>
