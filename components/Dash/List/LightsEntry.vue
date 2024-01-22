<script setup lang="ts">
import type {Light} from "~/types/types";
import {useHalsStoreMain} from "#imports";

const props = defineProps<{
 light: Light
}>()

const mainStore = useHalsStoreMain()
const {selectedLight} = storeToRefs(mainStore)
const lightColorInfoClass = computed(()=> {
  if(props.light.attributes.rgb_color) {
    return {
      background: `rgb(${props.light.attributes.rgb_color.join(',')})`
    }
  }
  else if(props.light.attributes.color_temp_kelvin) {
    return {
      background: ``
    }
  }
})
const setCurrentLight = () => {
  mainStore.setSelectedLight(props.light.entity_id)
}
const isActive = computed(()=>{
  return props.light.entity_id === selectedLight.value.entity_id
})
</script>

<template>
<div :class="{active: isActive}" @click="setCurrentLight" class="lightInfo">
  <div :style="lightColorInfoClass"  class="lightInfo__color"></div>
  <div class="lightInfo__main">
    <span>{{props.light.attributes.friendly_name}}</span>
    <span>Status: {{light.state}}</span>
  </div>
</div>
</template>

<style scoped lang="scss">
.active{
  border-bottom: .2rem solid $highlight;
}
.lightInfo{
  height: 8rem;
  padding: 1.5rem 2rem;
  display: flex;
  background-color: $base_color_medium;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  transition: all .1s ease-out;
  &__color {
    height: 6rem;
    width: 6rem;
    clip-path: circle(2rem);
  }
  &__main {
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
  }
  &:hover {
    transform: translateY(-.2rem) scale(1.05);
    outline: .5rem solid $highlight;
    cursor: pointer;
  }
  &:active {
    transform: translateY(0) scale(1);
    outline: .75rem solid $highlight_alt;
  }
}
</style>