<script setup lang="ts">
import type {Light} from "~/types/types";

const ref1 = ref()
const props = defineProps<{
 light: Light
}>()
const emits = defineEmits<{
  (e: 'selectLight', lightInfo: Light):void
}>()
const lightState = ref(props.light.state)
const lightColor = ref(props.light.attributes.rgb_color ?? props.light.attributes.color_temp_kelvin)
const lightBrightness = ref(props.light.attributes.brightness ?? 255)
const lightColorString = ref([...lightColor.value, (lightBrightness.value/255).toFixed(1)].join(','))
const lightName = ref(props.light.attributes.friendly_name)
const lightColorInfoClass = reactive({
  background: `linear-gradient(to bottom, rgba(${lightColorString.value}), #595959)`,
})
const selectLight = () => {
  emits('selectLight', props.light)
}
console.log(`linear-gradient(to bottom, rgba(${lightColorString.value}), #595959)`)
</script>

<template>
<div @click="selectLight" class="lightInfo">
  <div :style="lightColorInfoClass" class="lightInfo__color">color</div>
  <div class="lightInfo__main">
    <span>{{lightName}}</span>
    <span>Status: {{lightState}}</span>
  </div>
</div>
</template>

<style scoped lang="scss">
.lightInfo{
  height: 10rem;
  padding: 1.5rem 2rem;
  display: flex;
  background-color: $base_color_medium;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  transition: all .1s ease-out;
  &__color {
    height: 80%;
    clip-path: circle(1rem);
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