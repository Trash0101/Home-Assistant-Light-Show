<script setup lang="ts">
import type {Light} from "~/types/types";

useHead({
  title: 'Dashboard'
})
const runtimeConfig = useRuntimeConfig()
let selectedLight = reactive<Light>()
const isSelected = ref(false)
const changeSelectedLight = (light:Ref<Light>) => {
  console.log(light)
  selectedLight = {
    ...light
  }
  console.log(selectedLight)
  !isSelected.value
}
</script>

<template>
<section class="dash">
  <dash-list @select-light="changeSelectedLight" ></dash-list>
  <dash-control-panel v-if="!isSelected" :selectedLight="selectedLight"></dash-control-panel>
</section>
</template>

<style lang="scss" scoped>
.dash{
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns:  20% 60% 20%;
  gap: 2rem;
  padding: 5%;
  background-color: rgba($base_color, 0.9);
}

</style>