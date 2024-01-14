<script setup lang="ts">
import SetupCard from "~/components/Base/SetupCard.vue";
import {setStoreLights} from "#imports";
const setupStore = useHalsSetupStore()
const errorState = ref(false)
const keyValue = ref('')
const {key} = storeToRefs(setupStore)
const emits = defineEmits<{
  (e: 'next', component: string): void
}>()
const sendValue = () => {
  const success = setupStore.setKey(keyValue.value)
  if(!success) {
    errorState.value = true;
  } else {
    errorState.value = false;
    emits('next', 'setupTest')
  }
}
const goBack = () => {
  emits('next', 'setupAddress')
}
onMounted(async ()=> {
  if(!!key.value) {
    await setStoreLights()
  }
})
</script>

<template>
  <setup-card>
    <div class="address__message">Now you need to obtain or create Long-lived access tokens in your Home Assistant app. <br>
      So that HALS can send commands to your Home Assistant server.<br>
      It can be found or created at the bottom of <a target="_blank" :href="`${setupStore.address}/profile`" class="address__message--link">Profile</a> page.</div>
    <div class="address__error" v-if="errorState">Please enter the key</div>
    <input class="address__input" type="text" :class="{'address__error': errorState}" v-model="keyValue">
    <button @click="sendValue" class="address__button">Proceed</button>
    <div class="address__line--left"></div>
    <ph-caret-left size="48" class="address__back" @click="goBack"></ph-caret-left>
  </setup-card>
</template>

<style scoped lang="scss">
.address {
  &__back {
    position: absolute;
    left: 0;
    top: 50%;
    height: 100%;
    transform: translateY(-50%);
    transition: .2s ease-out;
    &:hover {
      color: $highlight;
      transform: translateY(-51%) scale(1.02);
    }
    &:active {
      color: $highlight_alt;
      transform: translateY(-50%) scale(1);
    }
  }
  &__forward {
    position: absolute;
    right: 0;
    top: 50%;
    height: 100%;
    transform: translateY(-50%);
    transition: .2s ease-out;
    &:hover {
      color: $highlight;
      transform: translateY(-51%) scale(1.02);
    }
    &:active {
      color: $highlight_alt;
      transform: translateY(-50%) scale(1);
    }
  }
  &__line--left {
    position: absolute;
    width: .1rem;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba($highlight, .3) 30%, rgba($highlight, .3) 70%, transparent);
    //background-color: rgba($highlight, .3);
    left: 4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  &__line--right {
    position: absolute;
    width: .1rem;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba($highlight, .3) 30%, rgba($highlight, .3) 70%, transparent);
    //background-color: rgba($highlight, .3);
    right: 4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  &__message{
    font-size: 1.6rem;
    text-align: center;
    &::selection {
      background-color: $highlight;
      color: #36454F;
    }
    &--link {
      color: $highlight;
      text-decoration: none;
      &:hover {
        color: $highlight_alt;
        text-shadow: .1rem .1rem 1rem rgba($highlight_alt, .5);
        cursor: pointer;
      }
    }
  }
  &__error {
    color: $highlight_error !important;
    text-shadow: .1rem .1rem 1rem rgba($highlight_error, .5);
    font-size: 1.6rem;
  }
  &__input {
    color: $highlight;
    font-size: 2.4rem;
    padding: 1.5rem 2rem;
    border-radius: 1rem;
    border: solid white .1rem;
    width: 80%;
    height: 4rem;
    box-shadow:  .1rem .1rem 2rem rgba($highlight, .4);
    text-align: center;
  }
  &__button {
    color: #36454F;
    font-size: 1.6rem;
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
</style>