import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tw.css'

const app = createApp(App)
app.use(store)
app.use(router)

// global components
import Butt from './components/Butt.vue'
import Cont from './components/Cont.vue'
import Scrollable from './components/Scrollable.vue'
app.component('Butt', Butt)
app.component('Cont', Cont)
app.component('Scrollable', Scrollable)

app.mount('#app')
