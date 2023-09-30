<template>
  <progress
    v-show="isLoading"
    style="position: fixed; bottom: -30px; left: 0; right: 0"
    class="nes-progress is-pattern"
    :value="progressValue"
    max="100"
  ></progress>
</template>
<script lang="ts" setup>
import useLoader from '@/stores/loader'
import { useIntervalFn } from '@vueuse/core'
import { ref, watch } from 'vue'

const { isLoading } = useLoader()

const progressValue = ref(0)
const { pause, resume } = useIntervalFn(
  () => {
    if (progressValue.value >= 100) progressValue.value = 0
    else progressValue.value = progressValue.value + 20
  },
  50,
  { immediate: false }
)

watch(isLoading, (v) => {
  if (v) resume()
  else pause()
})
</script>
