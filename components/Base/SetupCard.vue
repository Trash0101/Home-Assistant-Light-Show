<script setup lang="ts">

</script>

<template>
  <div class="base-container">
    <img class="base-container__logo" src="@/assets/HALS_LOGO_FINAL.svg" alt="HALS Logo">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.base-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
  padding: 1rem;
  &__logo {
    height: 40%;
  }
  &::selection {
    color: $highlight_alt;
  }
}
</style>