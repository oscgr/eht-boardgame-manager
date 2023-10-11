<template>
  <button
    type="button"
    class="nes-btn"
    @click="open"
    style="position: fixed; right: 20px; top: 20px"
  >
    <img
      v-show="!!me"
      class="nes-avatar is-small is-rounded"
      alt="Gravatar image example"
      :src="getGravatarImageUrl(me)"
      style="image-rendering: pixelated; margin-right: 5px"
    />
    <span v-text="me || '?'" />
  </button>
  <dialog class="nes-dialog" id="dialog-who-am-i" ref="dialogWhoAmI">
    <form method="dialog" novalidate @submit.prevent="save">
      <p class="title">Qui suis-je ? <br />Veuillez renseigner votre trigramme</p>
      <div class="nes-field" style="padding-bottom: 1rem">
        <label style="display: none" for="name_creation"></label>
        <input
          v-model="tempMe"
          minlength="3"
          maxlength="3"
          required
          type="text"
          id="name_creation"
          class="nes-input"
        />
      </div>
      <menu class="dialog-menu">
        <button
          type="submit"
          class="nes-btn is-primary"
          :class="{ 'is-disabled': !tempMe || tempMe.length !== 3 }"
        >
          OK
        </button>
      </menu>
    </form>
  </dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import md5 from 'crypto-js/md5'
import useConfiguration from '@/stores/configuration'

const dialogWhoAmI = ref<HTMLDialogElement>()
const tempMe = ref('')
const me = useLocalStorage('me', null)

const { configuration } = useConfiguration()

const save = async () => {
  if (!tempMe.value || tempMe.value.length !== 3) return
  me.value = tempMe.value
  dialogWhoAmI.value?.close()
}

const open = () => {
  tempMe.value = me.value || ''
  dialogWhoAmI.value?.showModal()
}

const getGravatarImageUrl = (user: string) => {
  return (
    'https://www.gravatar.com/avatar/' +
    md5(user + '@' + configuration.value.work_domain) +
    '?d=retro'
  )
}

onMounted(() => {
  if (!me.value) open()
})
</script>
