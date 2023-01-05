import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index";
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import ExpensesView from '@/views/ExpensesView.vue';
import IncomesView from '@/views/IncomesView.vue';
import PurchaseView from '@/views/PurchaseView.vue';
import DepositeView from '@/views/DepositView.vue';
import LogoffView from '@/views/LogoffView.vue';
import ChecksView from '@/views/ChecksView.vue';
import AboutView from '@/views/AboutView.vue';
import ChecksControlView from '@/views/ChecksControlView.vue';
import CheckDetailsView from '@/views/CheckDetailsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true,accessType: 'common' }
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: ExpensesView,
    meta: { requiresAuth: true,accessType: 'common' }
  },
  {
    path: '/incomes',
    name: 'incomes',
    component: IncomesView,
    meta: { requiresAuth: true,accessType: 'common' }
  },
  {
    path: '/checks',
    name: 'checks',
    component: ChecksView,
    meta: { requiresAuth: true,accessType: 'common' }
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: DepositeView,
    meta: { requiresAuth: true,accessType: 'common' }
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: PurchaseView,
    meta: { requiresAuth: true,accessType: 'common' }
  },
  {
    path: '/login',
    name: 'LoginView',    
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'RegisterView',    
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/logoff',
    name: 'LogoffView',    
    component: LogoffView,
    meta: { requiresAuth: true, accessType: 'all' }
  },
  {
    path: '/about',
    name: 'AboutView',    
    component: AboutView,
    meta: { requiresAuth: true, accessType: 'all' }
  },
  {
    path: '/checkcontrol',
    name: 'ChecksControlView',    
    component: ChecksControlView,
    meta: { requiresAuth: true, accessType: 'admin'}
  },
  {
    path: '/checkdetails/:id',
    name: 'CheckDetailsView',    
    component: CheckDetailsView,
    meta: { requiresAuth: true, accessType: 'admin'}
  }
]

const router = createRouter({         
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {  
  var access_token = store.state.login.access_token;

  if (access_token == null){
    access_token = localStorage.getItem('token'); 
    store.state.login.access_token = access_token;    
  }
  
  //Check Auth required
  if (to.meta.requiresAuth && access_token == null) {      
    next("/login");
  }
  //Admin access  
  else if (to.meta.accessType == 'common'  && store.state.login.isAdmin) {
    next("/checkcontrol");
  }
  //normal access
  else if (to.meta.accessType == 'admin' && !store.state.login.isAdmin) {
    next("/");
  } else {  
    next();
  }
});

export default router;