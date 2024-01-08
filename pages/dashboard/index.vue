<script setup lang="ts">
import {useHalsStoreMain} from "#imports";
import DashAudioPlayer from "~/components/Dash/AudioPlayer.vue";
import DashSongsList from "~/components/Dash/List/Songs.vue";

useHead({
  title: 'Dashboard'
})
const mainStore = useHalsStoreMain()
const {selectedLightExists} = storeToRefs(mainStore)
const devToggle = ref(false)
const componentMounted = ref(false);
const devToggler = ()=>{
  devToggle.value = !devToggle.value
}
onMounted(()=>{
  componentMounted.value = true
})
</script>

<template>
    <section class="dash">
      <dash-list-lights></dash-list-lights>
      <dash-audio-player v-if="selectedLightExists && componentMounted"></dash-audio-player>
      <dash-control-container v-if="devToggle"></dash-control-container>
      <dash-list-songs></dash-list-songs>
      <div class="dev__toggle">
        <button class="dev__button" @click="devToggler">Change</button>
      </div>
    </section>
</template>

<style lang="scss" scoped>

.dash{
  position: relative;
  z-index: 2;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(4, 25%);
  grid-template-columns:  20% 60% 20%;
  align-content: center;
  justify-content: center;
  gap: 2rem;
  padding: 6rem;
  //background-color: rgba($base_color, 0.9);
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