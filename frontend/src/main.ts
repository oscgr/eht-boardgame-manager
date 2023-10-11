import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import useConfiguration from '@/stores/configuration'

const { getConfiguration } = useConfiguration()

await getConfiguration()
createApp(App).mount('#app')
