<script setup lang="ts">
import LoaderDisplay from '@/components/LoaderDisplay.vue'
import CreateDialog from '@/components/CreateDialog.vue'
import BoardgameTable from '@/BoardgameTable.vue'
import WhoAmIDialog from '@/components/WhoAmIDialog.vue'
import { computed } from 'vue'

const workName = computed(() => `@${import.meta.env.VITE_WORK_NAME}`)
</script>

<template>
  <header>
    <WhoAmIDialog />
    <h1 style="text-align: center; padding-top: 3rem">Boardgame manager</h1>
    <br />
    <h6 style="text-align: center; padding: 0 3rem" v-text="workName"></h6>
    <div style="padding: 0 5rem">
      <CreateDialog />
    </div>
  </header>
  <main class="flex justify-content-center" style="align-items: center; padding-top: 2rem">
    <BoardgameTable />
    <!-- Dialog -->
  </main>
  <LoaderDisplay />
</template>
<style>
tr.is-warning {
  background-color: #f7d51d;
}
</style>
