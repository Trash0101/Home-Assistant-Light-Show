<script setup lang="ts">


import {setStoreLights, useHalsStoreMain} from "#imports";
import type {Light} from "~/types/types";

const mainStore = useHalsStoreMain()
let selectedLight = reactive<Light>(mainStore.getLight(mainStore.getSelectedLight))

const {selectedLight: selectedLightId} = storeToRefs(mainStore)

watch(selectedLight, async() => {
  const res = await $fetch('/api/setLightParams', {
    method: 'post',
    body: {
      entity_id: selectedLight.entity_id,
      brightness: selectedLight.attributes.brightness,
      rgb_color: selectedLight.attributes.rgb_color
    }
  })
  mainStore.setLightRGBA([...selectedLight.attributes.rgb_color, selectedLight.attributes.brightness],
      selectedLightId.value)
})
watch(selectedLightId, async ()=> {
  await setStoreLights()
  selectedLight.value = mainStore.getLight(mainStore.selectedLight)
})
const randomizer = async () => {
  await $fetch('/api/setLightRand', { method: 'post'})
}
</script>

<template>
<section class="control">

  <div class="control__name">{{selectedLight.attributes.friendly_name}}</div>
  <div class="control__red">
    <input class="control__red" v-model="selectedLight.attributes.rgb_color[0]">
  </div>
  <div class="control__green">
    <input class="control__green" v-model="selectedLight.attributes.rgb_color[1]">
  </div>
  <div class="control__blue">
    <input class="control__blue" v-model="selectedLight.attributes.rgb_color[2]">
  </div>
  <div class="control__brightness">
    <input class="control__brightness" v-model="selectedLight.attributes.brightness">
  </div>
  <button @click="randomizer">RANDOM</button>
</section>
</template>

<style scoped lang="scss">
.control {
  grid-row: 1/5;
  grid-column: 2/3;
  border-radius: 1rem;
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  display: grid;
  grid-template-columns: repeat(4, 10rem);
  grid-template-rows: repeat(2, 10rem);
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  &__name {
    font-size: 2rem;
    grid-column: 1/5 ;
  }
  &__red {
    background: red;
  }
  &__blue {
    background: blue;
  }
  &__green {
    background: green;
  }
  &__brightness {
    background: white;
  }
}
</style>