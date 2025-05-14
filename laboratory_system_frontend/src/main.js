import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import axios from "axios";

const app = createApp(App);

const ax_instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api/",
});
app.config.globalProperties.$http = { ...ax_instance };

app.use(router);

app.use(store);

app.mount("#app");