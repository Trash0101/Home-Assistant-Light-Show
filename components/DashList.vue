<script setup lang="ts">

  const {data, pending, error, refresh}: {data: Ref<Light[]>} = await useFetch('/api/getLightsList', {
    method: 'get',
    server: false,
    lazy: true,
  })
  const emits = defineEmits<{
    (e: 'selectLight', lightInfo: Light):void
  }>()
  const sendUpwards = (payload) => {
    emits('selectLight', payload)
  }
</script>

<template>
<div class="dash__list shadow-md">
  <dash-list-light @select-light="sendUpwards" v-for="light in data" :key="light.entity_id" :light="light"></dash-list-light>
</div>
</template>

<style lang="scss" scoped>
.dash__list{
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  border-radius: 1rem;
  grid-row: 1/5;
  display: flex;
  flex-direction: column;
  gap: 2.4rem
}
</style>