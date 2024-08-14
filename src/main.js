import { createApp } from 'vue';
import http from './api/request'; // 路径根据实际情况调整
import App from './App.vue';
import router from './router';
import LeagueService from './services/LeagueService'; 
import navBar from './components/navBar'; 
import bottomBar from './components/bottom'; 
const app = createApp(App);
app.use(router)
app.component('navBar',navBar)
app.component('bottomBar',bottomBar)
app.config.globalProperties.$http = http;
app.config.globalProperties.$leagueService = new LeagueService();
app.mount('#app');