import Vue from 'vue'
import Router from 'vue-router'

import SiteMap from '@/components/SiteMap'
import LogIn from '@/components/LogIn'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SiteMap',
      component: SiteMap
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },{
      path: '/detail',
      name: 'Detail',
      component: Detail
    },{
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
