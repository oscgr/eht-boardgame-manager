<template>
  <button
    v-show="!boardgame.lent_to"
    type="button"
    class="nes-btn is-primary is-rounded"
    @click="open"
  >
    +
  </button>
  <dialog class="nes-dialog" id="dialog-lending" ref="dialogLending">
    <form method="dialog" novalidate @submit.prevent="save">
      <p class="title">Prêté à :</p>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label style="display: none" for="name_creation"></label>
        <input
          v-model="tempLentTo"
          minlength="3"
          maxlength="3"
          required
          type="text"
          id="name_creation"
          class="nes-input"
        />
      </div>
      <menu class="dialog-menu">
        <button type="button" @click="close" class="nes-btn">Annuler</button>
        <button type="submit" class="nes-btn is-primary" :class="{ 'is-disabled': !tempLentTo }">
          OK
        </button>
      </menu>
    </form>
  </dialog>
</template>
<script lang="ts" setup>
import type { Boardgame } from '@/stores/boardgames'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import useBoardgames from '@/stores/boardgames'

const props = defineProps<{ boardgame: Boardgame }>()

const dialogLending = ref<HTMLDialogElement>()
const tempLentTo = ref('')
const me = useLocalStorage('me', null)
const { patch } = useBoardgames()
const save = async () => {
  if (!tempLentTo.value || tempLentTo.value.length !== 3) return

  await patch({ id: props.boardgame.id, lent_to: tempLentTo.value })
  dialogLending.value?.close()
}
const close = () => {
  dialogLending.value?.close()
}

const open = () => {
  tempLentTo.value = me.value || ''
  dialogLending.value?.showModal()
}
</script>
