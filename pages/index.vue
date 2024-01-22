<script setup lang="ts">
import {SetupWelcome, SetupAddress, SetupKey, SetupTest} from "#components";
const activeComponent = ref('setupWelcome')
const isConfigSet = await $fetch('/api/checkConfig')
const direction = ref('forward')
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
const changeActiveComp = (name:string, dir:string) => {
  activeComponent.value = name
  direction.value = dir
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
      <transition :name="direction">
        <component @next="changeActiveComp" :is="sliderDots"></component>
      </transition>
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
.forward-enter-from {
  transform: translate(100%, -50%);
  opacity: 0;
}
.forward-enter-active {
  transition: all .3s ease-in;
}
.forward-enter-to {
  transform: translate(0, -50%);
  opacity: 1;
}
.forward-leave-from {
  transform: translate(0, 50%);
  opacity: 1;
}
.forward-leave-active {
  transition: all .3s ease-out;
}
.forward-leave-to {
  transform: translate(-100%, 50%);
  opacity: 0;
}

.back-enter-from {
  transform: translate(-100%, -50%);
  opacity: 0;
}
.back-enter-active {
  transition: all .3s ease-in;
}
.back-enter-to {
  transform: translate(0, -50%);
  opacity: 1;
}
.back-leave-from {
  transform: translate(0, 50%);
  opacity: 1;
}
.back-leave-active {
  transition: all .3s ease-out;
}
.back-leave-to {
  transform: translate(100%, 50%);
  opacity: 0;
}
</style>