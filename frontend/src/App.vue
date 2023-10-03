<script setup lang="ts">
import LoaderDisplay from '@/components/LoaderDisplay.vue'
import BoardgameTable from '@/BoardgameTable.vue'
import WhoAmIDialog from '@/components/WhoAmIDialog.vue'
import { computed } from 'vue'
import CreateDialog from '@/components/CreateDialog.vue'

const workName = computed(() => `@${import.meta.env.VITE_WORK_NAME}`)
</script>

<template>
  <header>
    <WhoAmIDialog />
    <h1 style="text-align: center; padding-top: 3rem">Boardgame manager</h1>
    <br />
    <h6 style="text-align: center; padding: 0 3rem" v-text="workName"></h6>
  </header>
  <main>
    <div style="padding: 1rem 0">
      <CreateDialog />
    </div>
    <BoardgameTable />
    <!-- Dialog -->
  </main>
  <LoaderDisplay />
</template>
<style>
main {
  overflow-x: hidden;
}
@media (min-width: 1250px) {
  main {
    padding: 0 5rem;
  }
}
</style>
