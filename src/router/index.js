import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Main from '../components/main/main'
import Create from '../components/main/create'
import Member from '../components/main/member'
import Edit from '../components/main/edit'
import Detail from '../components/main/detail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/member/:name',
      name: 'member',
      component: Member,
      props: true,
      meta: {
        title: 'member',
        icon: '',
      }
    },
    {
      path: '/edit/:dataset',
      name: 'edit',
      component: Edit,
      props: true,
      meta: {
        title: 'edit',
        icon: ''
      }
    },
    {
      path: '/detail/:dataset',
      name: 'detail',
      component: Detail,
      props: true,
      meta: {
        title: 'detail',
        icon: ''
      }
    }
  ]
})
