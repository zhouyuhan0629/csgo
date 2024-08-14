import { createRouter, createWebHistory } from 'vue-router';
import schedule from '../pages/schedule.vue';
import leaderborard from '../pages/leaderboard.vue';
import NotFound from '../pages/404.vue';
const routes = [
  {
    path: '/',
    name: 'index',
    component: schedule
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: schedule
  },{
    path: '/leaderboard',
    name: 'leaderboard',
    component: leaderborard
  }, {
    path: '/404', // 捕获所有未定义路由
    name: 'NotFound',
    component: NotFound,
  }
  // ,{
  //   path:'/:pathMatch(.*)',
  //   redirect:'/404',
  //   hidden:true
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;