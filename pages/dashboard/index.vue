<script setup lang="ts">
import {setStoreLights, useHalsStoreMain, usePlayerStore} from "#imports";
import DashAudioPlayer from "~/components/Dash/AudioPlayer.vue";
import DashSongsList from "~/components/Dash/List/Songs.vue";

useHead({
  title: 'Dashboard'
})
const mainStore = useHalsStoreMain()
const playerStore = usePlayerStore()
const {selectedSongIndex}  = storeToRefs(playerStore)
const {selectedLightExists} = storeToRefs(mainStore)
const devToggle = ref(false)
const componentMounted = ref(false);
const refreshLights = async ()=> {
  await setStoreLights()
}
const resetConfig = async () => {
  await $fetch('/api/resetConfig')
  navigateTo({
    path: '/'
  })
}

const isConfigSet = await $fetch('/api/checkConfig')
if(!isConfigSet.result) {
  navigateTo({
    path: '/'
  })
}

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
      <dash-audio-player @open-settings="devToggler" v-if="selectedLightExists && componentMounted"></dash-audio-player>
      <dash-control-container @close-settings="devToggler" v-if="devToggle && selectedLightExists && componentMounted"></dash-control-container>
      <div class="error__no_lights" v-if="!selectedLightExists && componentMounted">
        <div class="error__no_lights--text">Sorry, but there are no lights in your Home Assistant app.</div>
        <div class="button_container">
          <button class="button_container__button" @click="resetConfig">Reset</button>
          <button class="button_container__button" @click="refreshLights">Refresh</button>
        </div>
      </div>
      <div class="error__no_lights" v-if="selectedSongIndex === -1 && !(!selectedLightExists && componentMounted)">
        <div class="error__no_lights--text">Upload a song to begin!</div>
      </div>
      <dash-list-songs></dash-list-songs>
<!--      <div class="dev__toggle" v-if="selectedLightExists && componentMounted">-->
<!--        <button class="dev__button" @click="devToggler">Change</button>-->
<!--      </div>-->
    </section>
</template>

<style lang="scss" scoped>
.error{
  &__no_lights {
    grid-row: 2/5;
    grid-column: 2;
    border-radius: 1rem;
    background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &--text {
      text-align: center;
      font-size: 3.6rem;
      margin-bottom: 4rem;
    }
  }
}
.button_container {
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-around;
  &__button {
    color: #36454F;
    font-size: 2.4rem;
    padding: 1rem 6rem;
    border-radius: 5rem;
    background-color: $highlight;
    box-shadow: .1rem .75rem .75rem rgba($highlight, .1);
    transition: .2s ease-out;
    &:hover {
      transform: translateY(-.5rem) scale(1.02);
    }
    &:active {
      background-color: $highlight_alt;
      box-shadow: .1rem 1rem 1rem rgba($highlight_alt, .2);
      transform: translateY(0) scale(1);
    }
  }
}
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