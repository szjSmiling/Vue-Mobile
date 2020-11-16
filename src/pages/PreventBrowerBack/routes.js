const PreventBrowerBack = [
  {
    name: 'prevent-brower-back',
    path: '/prevent-brower-back',
    component: () => import('@/pages/PreventBrowerBack/index'),
    meta: {
      allowBack: false
    }
  }
]

export default PreventBrowerBack