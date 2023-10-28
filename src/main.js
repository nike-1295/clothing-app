import { createApp } from 'vue'
import App from './App.vue'
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from './router';
import { createPinia } from 'pinia';
import VueLazyload from 'vue-lazyload';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

createApp(App)
.use(router)
.use(pinia)
.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://w7.pngwing.com/pngs/285/84/png-transparent-computer-icons-error-super-8-film-angle-triangle-computer-icons.png',
    loading: 'https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp',
    attempt: 1,
  })
.mount('#app')
