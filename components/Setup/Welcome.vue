<script setup lang="ts">
import SetupCard from "~/components/Base/SetupCard.vue";
const emits = defineEmits<{
  (e: 'next', component: string, direction:string): void
}>()
const nextCard = ()=> {
  emits('next', 'setupAddress', 'forward')
}
</script>

<template>
  <setup-card>
    <div class="welcome-container__message">We will walk you through the simple process of setting everything up.</div>
    <button @click="nextCard" class="welcome-container__button">Proceed</button>
  </setup-card>
</template>

<style scoped lang="scss">
.welcome-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
  &__logo {
    height: 40%;
  }
  &__message {
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 5rem;
  }
  &__button {
    color: #36454F;
    font-size: 1.6rem;
    padding: 1rem 4rem;
    border-radius: 5rem;
    background-color: $highlight;
    box-shadow: .1rem 1rem 1rem rgba($highlight, .2);
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