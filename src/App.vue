<script setup>
import routeIndex from './view/routeIndex.vue'
import { useRoute} from "vue-router";
import { computed } from "vue";
import {storeA}  from '@/piniaStore/storeA'
 let piniaStoreA = storeA()
// let { piniaMsg, name } = storeToRefs(piniaStoreA)
piniaStoreA.$patch({
  piniaMsg: 'hello juejin',
  name: 'daming'
})
console.log(piniaStoreA.piniaMsg); //hello pinia

// const route = useRoute();
// const key = computed(() => {
//   return route.liveSubscribe + Math.random();
// });
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header> -->

  <main>
    <p>{{piniaStoreA.piniaMsg}}</p>
    <router-view></router-view>

     <routeIndex  msg="欢迎浏览"/>  
  </main>
</template>

<style scoped>
html,body{
  width: 750px;
  overflow: hidden;
}
#app,main{
  width: 750px;
  overflow: hidden;
}
</style>
