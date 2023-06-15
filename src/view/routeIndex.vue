<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div>
     
        <button @click="jump('generateUrl')">直播链接转化</button>
        <button @click="jump('liveSubscribe')">直播预约</button>
         
<!-- 
        <router-link to="/generateUrl">generateUrl</router-link> |
        <router-link to="/liveSubscribe">liveSubscribe</router-link> -->
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>

import {useRouter} from 'vue-router'
  export default {
    name: 'routeIndex',
    props: {
      msg: String
    },
    setup(){
        const router=useRouter();
        const jump=(e)=>{
        if(e == 'liveSubscribe') {
          router.push('liveSubscribe')
        }
        if(e == 'generateUrl') {
          router.push('/generateUrl')
        }
      }
        return {
            jump
        }
    },
    methods: {
      // show(index) {
      //   if(index == 'liveSubscribe') {
      //     this.$router.push('/liveSubscribe')
      //   }
      //   if(index == 'generateUrl') {
      //     this.$router.push('/generateUrl')
      //   }
      // }
    }
  }
  </script>
  