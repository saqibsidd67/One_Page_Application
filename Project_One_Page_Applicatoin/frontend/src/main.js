import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'; // import pinia


const app = createApp(App)
const pinia = createPinia(); // create pinia instance
pinia.use(({ store }) => {
    store.$router = markRaw(router) // add router to store
});

app.use(pinia)
app.use(router)
app.mount('#app')


