import Vue from 'vue';
import Router from 'vue-router';
import {Indicator} from 'mint-ui';

const HelloWorld = resolve => require(['Pages/HelloWorld.vue'],resolve);
const PDF = resolve => require(['Pages/showPDF.vue'],resolve);
const activity = resolve => require(['Pages/activity/activity.vue'],resolve);
const actDetails = resolve => require(['Pages/activity/actDetails.vue'],resolve);
const actPrizes = resolve => require(['Pages/activity/actPrizes.vue'],resolve);

Vue.use(Router);

const router =  new Router({
  mode: "history",//如果不更改设置,增加mode;vue会默认使用hash模式,该模式下会将路径格式化为#开头
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // redirect: "/HelloWorld",
      meta: {
        keepAlive: true
      }
    },
    {
      path:'/PDF',
      component:PDF
    },
    {
      path:'/activity',
      component:activity,
      children:[
        {
          path:'actDetails',
          component:actDetails
        },{
          path:'actPrizes',
          component:actPrizes
        },
      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  Indicator.close();
  next();
});
export default router;
