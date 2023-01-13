import router from './router'
import './assets/css/app.css'
import { createApp } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './views/layout/Index.vue'
import mitt from 'mitt';
import {axiosInstance} from "@/plugins/axios";
require('./plugins/axios')
const emitter = mitt();
const app = createApp(App)

app.provide('emitter', emitter);
app.provide('axios', axiosInstance);
app.use(Toast)
app.use(router).mount('#app')
