import Vue from 'vue';
import Router from 'vue-router';
import {Indicator} from 'mint-ui';

const HelloWorld = resolve => require(['@/components/HelloWorld'],resolve);
const PDF = resolve => require(['@/pages/showPDF.vue'],resolve);

Vue.use(Router);

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: true
      }
    },
    {
      path:'/PDF',
      component:PDF
    }
  ]
});
router.beforeEach((to, from, next) => {
  Indicator.close();
  next();
});
export default router;
