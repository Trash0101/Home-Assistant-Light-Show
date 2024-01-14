<script setup lang="ts">
import {SetupWelcome, SetupAddress, SetupKey, SetupTest} from "#components";
const activeComponent = ref('setupWelcome')
const isConfigSet = await $fetch('/api/checkConfig')
const sliderDots = computed(()=> {
  if(activeComponent.value == 'setupWelcome'){
    return SetupWelcome
  } else if (activeComponent.value == 'setupAddress'){
    return SetupAddress
  } else if (activeComponent.value == 'setupKey') {
    return SetupKey
  } else if (activeComponent.value == 'setupTest') {
    return SetupTest
  }
})
const changeActiveComp = (name:string) => {
  activeComponent.value = name
}
if(isConfigSet.result) {
  navigateTo({
    path: '/dashboard'
  })
}
</script>

<template>
  <div class="flex-center">
    <div class="main-container">
      <component @next="changeActiveComp" :is="sliderDots"></component>
      <div class="slides" v-if="activeComponent !== 'setupTest'">
        <div class="slides__dots" :class="{'slides__dots--active': activeComponent === 'setupWelcome'}"></div>
        <div class="slides__dots" :class="{'slides__dots--active': activeComponent === 'setupAddress'}"></div>
        <div class="slides__dots" :class="{'slides__dots--active': activeComponent === 'setupTest'}"></div>
        <div class="slides__dots"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  background-color: magenta;
}
  .flex-center{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-container{
    position: relative;
    padding: 1rem 4rem;
    border-radius: 1rem;
    background-color: $base_color;
    height: 60rem;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    z-index: 2;
  }
.slides {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &__dots{
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    background-color: $highlight;
    transition: all 0.2s ease-out;
    &--active {
      background-color: $highlight_alt;
      box-shadow: .1rem .1rem 1rem rgba($highlight_alt, .4);
    }
  }
}
</style>