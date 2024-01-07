<script setup lang="ts">
import {useHalsStoreMain, usePlayerStore} from "#imports";

const playerStore = usePlayerStore()
const mainStore = useHalsStoreMain()
const timelineRange = ref([0,100])
const {selectedSongIndex, selectedSong} = storeToRefs(playerStore)
const {selectedLight} = storeToRefs(mainStore)
const timeStart = computed(()=> {
  if(selectedLight.value && selectedLight.value.songSettings[selectedSongIndex.value]){
    return readableTimeConverter(selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].timeRange[0])
  }
})
const timeEnd = computed(()=> {
  return readableTimeConverter(selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].timeRange[1])
})

</script>

<template>
<div v-if="selectedLight.songSettings && selectedSong" class="timeline">
  <span class="timeline__label">SELECTED TIMELINE RANGE </span><span class="timeline__time">{{timeStart}}/{{timeEnd}}</span>
  <v-range-slider class="timeline__slider" step="1" min="0" :max="selectedSong?.duration" v-model="selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].timeRange"></v-range-slider>
</div>
</template>

<style scoped lang="scss">
.timeline{
  grid-column: 1/-1;
  grid-row: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  &__label{
    font-size: 1.6rem;
    text-align: center;
    color: $font_color;
  }
  &__time {
    font-size: 2.4rem;
    text-align: center;
    color: $highlight_alt;
  }
  &__label{
    width: 100%;
  }
}
</style>