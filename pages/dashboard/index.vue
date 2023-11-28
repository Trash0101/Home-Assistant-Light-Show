<script setup lang="ts">
import type {Light} from "~/types/types";
import {useHalsStoreMain} from "#imports";

useHead({
  title: 'Dashboard'
})
const mainStore = useHalsStoreMain()
const isSelected = ref(!!mainStore.selectedLight)

</script>

<template>
<section class="dash">
  <dash-list></dash-list>
  <dash-control-panel v-if="isSelected"></dash-control-panel>
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