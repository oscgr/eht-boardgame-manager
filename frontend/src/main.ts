import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import useConfiguration from '@/stores/configuration'

const { getConfiguration } = useConfiguration()

getConfiguration().then(() => {
  createApp(App).mount('#app')
})
