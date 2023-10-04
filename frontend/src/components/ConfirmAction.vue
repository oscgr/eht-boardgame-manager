<template>
  <slot :open="open" />

  <dialog class="nes-dialog" id="dialog" ref="dialog">
    <form method="dialog" novalidate @submit="ok">
      <p class="title" v-text="message || 'Êtes-vous sûr ?'"></p>
      <menu class="dialog-menu">
        <button type="reset" class="nes-btn" @click="close">Non</button>
        <button type="submit" class="nes-btn is-primary">Oui</button>
      </menu>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement>()
defineProps<{ message?: string }>()
const emits = defineEmits(['ok'])

const open = () => {
  dialog.value?.showModal()
}
const close = () => {
  dialog.value?.close()
}
const ok = () => {
  emits('ok')
}
</script>
