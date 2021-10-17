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
import Row from './components/Row.vue'
import Scrollable from './components/Scrollable.vue'
import Image from './components/Image.vue'
app.component('Butt', Butt)
app.component('Cont', Cont)
app.component('Row', Row)
app.component('Scrollable', Scrollable)
app.component('Image', Image)

app.mount('#app')