<script setup lang="ts">
import {useHalsStoreMain} from "#imports";

const mainStore = useHalsStoreMain()
const {lightsList: reactiveLightsList} = storeToRefs(mainStore)
const lightListExists = computed(() => {
  return !!mainStore.lightsList
})
</script>

<template>
<div class="dash__list shadow-md">
  <dash-list-lights-entry v-if="lightListExists" v-for="light in reactiveLightsList" :key="light.entity_id" :light="light"></dash-list-lights-entry>
  <div v-else>Sorry but no lights were found</div>
</div>
</template>

<style lang="scss" scoped>
.dash__list{
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  border-radius: 1rem;
  grid-row: 1/5;
  display: flex;
  flex-direction: column;
  gap: 2.4rem
}
</style>