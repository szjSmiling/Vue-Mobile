<template>
  <div class="third-landing">
    <!-- <button class="g-signin2" data-onsuccess="onSignIn">Login With Google</button> -->
    <button id="goggle_btn">Login With Google</button>
    <button @click="openWindow">aaaaaaaaaa</button>
  </div>
</template>
<script>
import { asyncLoadJs } from 'utils/tools';
export default {
  data () {
    return {
      
    }
  },
  created () {
    
  },
  mounted () {
    asyncLoadJs('https://apis.google.com/js/platform.js?onload=init', 'auth2').then(() => {
      gapi.load('auth2', function() {
        gapi.auth2.init({
          client_id: '158153948884-nfchpf5k6lopqa1t8e60uid3sbr0mp33.apps.googleusercontent.com'}
        ).attachClickHandler('goggle_btn', {
          // Signs in the user using the specified options.
          scope: 'profile email'
        },
        function (gUser) { // 登陆成功
          console.log(gUser)
          let token = gUser.getAuthResponse().id_token;
          //... 拿到google user 的token去到自己的网站注册登陆(这是默认操作)
        },
        function (error) { // 登陆失败
          console.log(error)
        })
      });
    })
  },
  methods: {
    openWindow () {
      let newWindow = window.open()
      setTimeout(() => {
        newWindow.location.href = 'https://www.szjSmiling.com';
      }, 1000)
    },
    onSignIn (googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log(profile)
    }
  },
}
</script>
<style lang="less" scoped>
button{
  padding: 0.1rem ;
  border: 1px solid #eee;
}
</style>