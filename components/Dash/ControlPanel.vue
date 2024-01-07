<script setup lang="ts">
import {useHalsStoreMain} from "#imports";
import setRGB from "~/composables/setRGB";

const mainStore = useHalsStoreMain()
const {selectedLight} = storeToRefs(mainStore)
const randomizer = async () => {
  await $fetch('/api/setLightRand', { method: 'post'})
}
watch(selectedLight, async () => {
  await setRGB(selectedLight.value)
}, {
  deep: true
})


</script>

<template>
<section class="control">

  <div class="control__name">{{selectedLight.attributes.friendly_name}}</div>
  <div class="control__red" v-if="selectedLight.attributes.rgb_color">
    <input class="control__red" v-model="selectedLight.attributes.rgb_color[0]">
  </div>
  <div class="control__green" v-if="selectedLight.attributes.rgb_color">
    <input class="control__green" v-model="selectedLight.attributes.rgb_color[1]">
  </div>
  <div class="control__blue" v-if="selectedLight.attributes.rgb_color">
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