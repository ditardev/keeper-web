import {registerPlugins} from '@/plugins'
import App from './App.vue'
import {createApp} from 'vue'
import {defineProfile} from "@/stores/app.js";

const app = createApp(App)

registerPlugins(app)
app.mount('#app')

defineProfile()
