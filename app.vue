<template>
  <div v-if="!appInitialized" class="modal--backdrop">
    <div class="modal--main">Initialize
      <button @click="initialize">Start</button>
    </div>
  </div>
  <nuxt-page v-else></nuxt-page>
</template>

<script setup lang="ts">
import {useHalsStoreMain} from "~/stores/halsStoreMain.ts";

const mainStore = useHalsStoreMain()
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `HALS - ${titleChunk}` : 'HALS';
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Roboto:wght@100;300;400;500;700;900&display=swap',
      crossorigin: true
    },
  ],
})
const appInitialized = ref(false)
const initialize = async () => {
  await setStoreLights()
  mainStore.setSelectedLightIndex(0);
  appInitialized.value = true
}

// const {data, pending, error, refresh}: {data: Ref<Light[]>} = await useFetch('/api/getLightsList', {
//   method: 'get',
//   server: false,
//   lazy: true,
// })


</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  font-size: 62.5%;
  font-family: Roboto, sans-serif;
  color: $font_color;
  background-color: $base_color_dark;
  height: 100vh;
}
.modal--backdrop {
  position: absolute;
  height: 100vh;
  width: auto;
}
.modal--main {
  font-size: 2.4rem;
  position: fixed;
  top: 50%;
  left: 50%;
  height: 10rem;
}
</style>
