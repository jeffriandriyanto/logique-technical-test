import { createApp } from 'vue'
import router from "./router/route";
import App from './App.vue'
import "./assets/styles/main.scss";

const app = createApp(App);
app.use(router);
app.mount('#app');

