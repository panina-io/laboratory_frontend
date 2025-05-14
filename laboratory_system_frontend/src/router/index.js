import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import LogOutForm from '@/components/LogOutForm.vue'
import RoomList from '@/components/RoomList.vue'
import ManufacturerList from '@/components/ManufacturerList.vue'
import IndicatorsList from '@/components/IndicatorsList.vue'
import ReagentLotList from '@/components/ReagentLotList.vue'
import RefrigeratorsList from '@/components/RefrigeratorsList.vue'
import ReagentMoveList from '@/components/ReagentMoveList.vue'
import AnalyzelsList from '@/components/AnalyzelsList.vue'
import AnalyzersConsumablesList from '@/components/AnalyzersConsumablesList.vue'
import ConsumablesMoveList from '@/components/ConsumablesMoveList.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOutForm,
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomList,
    },
    {
      path: '/indicators',
      name: 'indicators',
      component: IndicatorsList,
    },
    {
      path: '/manufacturers',
      name: 'manufacturers',
      component: ManufacturerList,
    },
    {
      path: '/reagent_lots',
      name: 'reagent_lots',
      component: ReagentLotList,
    },
    {
      path: '/refrigerators',
      name: 'refrigerators',
      component: RefrigeratorsList,
    },
    {
      path: '/reagents_journal',
      name: 'reagents_journal', 
      component: ReagentMoveList,
    },
    {
      path: '/analyzer_models',
      name: 'analyzer_models',
      component: AnalyzelsList,
    },
    {
      path: '/analyzers_consumables_lots',
      name: 'analyzers_consumables_lots', 
      component: AnalyzersConsumablesList,
    },
    {
      path: '/analyzers_consumables_journal',
      name: 'analyzers_consumables_journal', 
      component: ConsumablesMoveList,
    },
  ],
})

export default router
