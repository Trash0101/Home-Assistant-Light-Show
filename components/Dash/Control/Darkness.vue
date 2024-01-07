<script setup lang="ts">

import {useHalsStoreMain, usePlayerStore} from "#imports";

const mainStore = useHalsStoreMain()
const playerStore = usePlayerStore()
const {selectedSong, selectedSongIndex} = storeToRefs(playerStore)
const {selectedLight} = storeToRefs(mainStore)
</script>



<template>
  <section v-if="selectedSong && selectedLight.songSettings" class="darkness">
    <div class="darkness_header">DARKNESS SETTINGS</div>
    <div class="darkness__label">
      <span class="darkness__label--text">DARKNESS RANGE</span><span class="darkness__label--time">{{selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].ranges.darkness.frequency[0]}}/{{selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].ranges.darkness.frequency[1]}}</span>
      <v-range-slider :strict="true" class="darkness__label--range" step="100" min="0" :max="selectedSong.sampleRate/2" thumb-size="20" v-model="selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].ranges.darkness.frequency"></v-range-slider>
    </div>
    <div class="darkness__label">
      <span class="darkness__label--text">DIFFERENCE TO TRIGGER DARKNESS</span><span class="darkness__label--time">{{selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].ranges.darkness.difference}}</span>
      <v-slider  :strict="true" class="darkness__label--range" step="100" min="0" :max="selectedSong.sampleRate/2" thumb-size="20" v-model="selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].ranges.darkness.difference"></v-slider>
    </div>
  </section>
  <section v-else class="darkness">
    <div class="darkness_header">DARKNESS SETTINGS</div>
    <div class="darkness__label--disabled">
      <span class="darkness__label--text--disabled">PLEASE SELECT SONG TO ACCESS SETTINGS</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.darkness_header{
  font-size: 2.4rem;
  text-align: center;
  color: $highlight_alt;
  margin-bottom: 4rem;
}
.darkness {
  grid-row: 2;
  grid-column: 1/-2;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  &__label {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    width: 100%;
    &--disabled{
      margin-top: 2rem;
    }
    &--text {
      grid-row: 1;
      grid-column: 1/4;
      font-size: 1.6rem;
      color: $font_color;
      &--disabled {
        text-align: center;
        font-size: 1.6rem;
        color: $font_color;

      }
    }
    &--time {
      grid-row: 1;
      grid-column: 5;
      font-size: 1.6rem;
      color: $highlight_alt;
      text-align: right;
      align-self: end;
    }
    &--range {
      grid-row: 2;
      grid-column: 1/-1;
      width: 100%;
    }
  }
  &__range {
    width: 100%;
    height: 20%;
    bottom: 0;
    left: -.9rem;
    padding: 0;
    &:deep(.v-slider.v-input--vertical > .v-input__control) {
      min-height: 100px !important;
    }
    &--intensity{
      &:deep(.v-slider.v-input--vertical > .v-input__control) {
        min-height: 10rem !important;
      }
      height: 10rem;
      top: 50%;
      right: -1.5rem;
      //transform: scale(.5) translateY(-80%);
    }
  }
}
</style>