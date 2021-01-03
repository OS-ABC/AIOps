import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home/index.vue')
const LogInfo = () => import('@/views/logInfo/index.vue')
const LogDetail= () => import('@/views/logInfo/logDetail.vue')
const FaultCorrectKG = () => import('@/views/faultCorrectKG/index.vue')
const HadoopKG = () => import('@/views/HadoopKG/index.vue')
const Solutions = () => import('@/views/solutions/solutions.vue')
const SolutionDetail = () => import('@/views/solutions/solutionDetail.vue')
const Log = () => import('@/views/log/index.vue')
const KG = () => import('@/views/kg/index.vue')
Vue.use(Router)


const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'KG',
          name: 'KG',
          component: KG,
          children: [
            {
              path: 'FaultCorrectKG',
              name: 'FaultCorrectKG',
              component: FaultCorrectKG,
            },
            {
              path: 'HadoopKG',
              name: 'HadoopKG',
              component: HadoopKG,
            }
          ]
        },
        {
          path: 'log',
          name: 'Log',
          component: Log,
          children:[
            {
              path: 'LogInfo',
              name: 'LogInfo',
              component: LogInfo,
            },
            {
              path: 'LogInfo/LogDetail',
              name: 'LogDetail',
              component: LogDetail,
            },
            {
              path: 'LogInfo/Solutions',
              name: 'Solutions',
              component: Solutions,
            },
            {
              path: 'LogInfo/SolutionDetail',
              name: 'SolutionDetail',
              component: SolutionDetail,
            }
          ]
        },
      ]
    },
  ]

const router = new Router({
    mode:'history',
    routes // (缩写) 相当于 routes: routes
})

export default router