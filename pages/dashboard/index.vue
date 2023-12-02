<script setup lang="ts">
import {useHalsStoreMain} from "#imports";
import DashAudioPlayer from "~/components/DashAudioPlayer.vue";
import DashSongsList from "~/components/DashSongsList.vue";

useHead({
  title: 'Dashboard'
})
const mainStore = useHalsStoreMain()
const {selectedLightExists} = storeToRefs(mainStore)
const devToggle = ref(true)
const devToggler = ()=>{
  devToggle.value = !devToggle.value
}
</script>

<template>
<section class="dash">
  <dash-list></dash-list>
  <dash-control-panel v-if="selectedLightExists && devToggle"></dash-control-panel>
  <dash-audio-player v-else></dash-audio-player>
  <dash-songs-list></dash-songs-list>
  <div class="dev__toggle">
    <button class="dev__button" @click="devToggler">Change</button>
  </div>
</section>
</template>

<style lang="scss" scoped>
.dash{
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(4, 25%);
  grid-template-columns:  20% 60% 20%;
  align-content: center;
  justify-content: center;
  gap: 2rem;
  padding: 10rem;
  background-color: rgba($base_color, 0.9);
}
.dev{
  &__toggle {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    height:10rem;
    width: 10rem;
  }
  &__button {
    background: $highlight;
    border: none;
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      background: $highlight_alt;
    }
  }
}
</style>