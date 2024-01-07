<script setup lang="ts">
import type {Setting} from "~/types/types";

const playerStore = usePlayerStore()
const mainStore = useHalsStoreMain()
const {selectedLight} = storeToRefs(mainStore)
const {selectedSongIndex} = storeToRefs(playerStore)
const selectedRange = ref([0, 360])
const thumbColor = ref('rgb(255,255,255)')
const trackColor = ref('rgb(255,0,255)')
const chroma = ref(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])
const selectedChroma = ref('C')
const selectedLightSetting = computed(():Setting=>{
  return selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting]
})
const selectedChromaRGBValue = computed(()=>{
  const index = chroma.value.indexOf(selectedChroma.value)
  return `rgb(${selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].ranges.color.colors[index]})`
})
const setChromaValue = (e:string)=> {
  const RGBHEX = e.slice(1,-1).match(/.{1,2}/g);
  const RGB = [
    parseInt(RGBHEX[0], 16),
    parseInt(RGBHEX[1], 16),
    parseInt(RGBHEX[2], 16)
  ]
  const index = chroma.value.indexOf(selectedChroma.value)
  selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].ranges.color.colors[index] = [...RGB]
}
const switchInnerMode = () => {
  selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].ranges.color.range = !selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].ranges.color.range
  console.log(selectedLightSetting.value.ranges.color)
}
const createRange = (e:number[])=> {
  const index = chroma.value.indexOf(selectedChroma.value)
  thumbColor.value = `hsl(${e[1]}, 100%, 50%)`
  trackColor.value = `hsl(${e[0]}, 100%, 50%)`
  selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].ranges.color.colorRanges[index] = [e[0], e[1]]
}
const changeMode = (bool:boolean)=> {
  selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].random = bool
  selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].ranges.color.random = bool
}
watch(selectedChroma, ()=>{
  const index = chroma.value.indexOf(selectedChroma.value)
  selectedRange.value = [...selectedLightSetting.value.ranges.color.colorRanges[index]]
})

onMounted(()=> {
  const index = chroma.value.indexOf(selectedChroma.value)
  selectedRange.value = [...selectedLightSetting.value.ranges.color.colorRanges[index]]
})
</script>

<template>
  <section class="color">
    <div class="color__header">COLOR SETTINGS</div>
    <div class="mode_selector">
      <button :class="{'mode_selector__button--active': !selectedLightSetting.ranges.color.random}" @click="changeMode(false)" class="mode_selector__button">OCTAVE</button>
      <button :class="{'mode_selector__button--active': selectedLightSetting.ranges.color.random}" @click="changeMode(true)" class="mode_selector__button">RANDOM</button>
    </div>
    <div v-if="selectedLightSetting.ranges.color.octaves && !selectedLightSetting.ranges.color.random && !selectedLightSetting.ranges.color.range" class="octave_settings">
      <v-color-picker :canvas-height="100" :hide-inputs="true" mode="rgb" class="color_picker" @update:modelValue="setChromaValue" :model-value="selectedChromaRGBValue"></v-color-picker>
      <v-select class="octave_settings__octave_selector" :items="chroma" v-model="selectedChroma"></v-select>
      <div class="octave_settings__brightness">
        <span class="octave_settings__brightness--label">BRIGHTNESS RANGE</span>
        <span class="octave_settings__brightness--label">{{selectedLightSetting.ranges.color.brightness[0]}}/{{(selectedLightSetting.ranges.color.brightness[1])}}</span>
        <v-range-slider :strict="true" class="octave_settings__brightness--slider" step="1" min="0" max="255" v-model="selectedLightSetting.ranges.color.brightness"></v-range-slider>
      </div>
      <button @click="switchInnerMode" class="octave_settings__mode_switch">MODE</button>
    </div>
    <div v-if="selectedLightSetting.ranges.color.range" class="octave_settings">
      <div class="range_selector">
        <div class="range_selector__hue"></div>
        <v-range-slider :strict="true" step="1" min="0" max="360" :thumb-color="thumbColor" :track-fill-color="trackColor" thumb-label class="range_selector__slider" @update:modelValue="createRange"  v-model="selectedRange"></v-range-slider>
      </div>
      <v-select class="octave_settings__octave_selector" :items="chroma" v-model="selectedChroma"></v-select>
      <div class="octave_settings__brightness">
        <span class="octave_settings__brightness--label">BRIGHTNESS RANGE</span>
        <span class="octave_settings__brightness--label">{{selectedLightSetting.ranges.color.brightness[0]}}/{{selectedLightSetting.ranges.color.brightness[1]}}</span>
        <v-range-slider :strict="true" class="octave_settings__brightness--slider" step="1" min="0" max="255" @update:modelValue="createRange" v-model="selectedLight.songSettings[selectedSongIndex].settings[selectedLight.selectedSetting].ranges.color.brightness"></v-range-slider>
      </div>
      <button @click="switchInnerMode" class="octave_settings__mode_switch">MODE</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.range_selector{
  grid-row: 1/-1;
  grid-column: 1/-2;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  &__hue{
    border-radius: 1rem;
    height: 50%;
    width: 100%;
    background: linear-gradient(to right,
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
    );
  }
  &__slider{
    width: 100%
  }
}
.octave_settings {
  padding-top: 2rem;
  height: 100%;
  grid-row: 3/-1;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 2rem;
  &__octave_selector {
    grid-row: 1;
    grid-column: 2;
    color: $highlight_alt;
    &:hover{
      color: $highlight;
    }
    &:active{
      color: $highlight;
    }
  }
  &__brightness {
    grid-row: 2;
    grid-column: 2;
    &--label {
      text-align: center;
      display: block;
      font-size: 1.6rem;
      color: $highlight_alt
    }
  }
  &__mode_switch{
    grid-column: 2;
    grid-row: 3;
    height: 60%;
    border-radius: 1rem;
    text-align: center;
    font-size: 1.6rem;
    padding: 1rem 1.5rem;
    background-color: $highlight_alt;
    color: $base_grey;
    box-shadow:  .1rem 1rem 2rem rgba(#000, 0.6);

    &:hover {
      transform: translateY(-.1rem) scale(1.025);
      background-color: $highlight;
      box-shadow:  .2rem 2rem 2rem rgba(#000, 0.6);
    }
    &:active {
      transform: translateY(0) scale(1);
      box-shadow:  .1rem 1rem 2rem rgba(#000, 0.6);
      background-color: $highlight_alt;
    }
  }
}
.color__header {
  grid-row: 1;
  grid-column: 1/-1;
  font-size: 2.4rem;
  text-align: center;
  color: $highlight_alt;
  margin-bottom: 1rem;
}
.color_picker{
  align-self: center;
  grid-row: 1/-1;
  grid-column: 1/-2;
  width: 100px;
}
.color {
  grid-row: 2;
  grid-column: 1/-2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 15% 15% 30% 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
}
.mode_selector{
  grid-row: 2;
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  &__button{
    border-radius: 1rem;
    text-align: center;
    width: 10rem;
    font-size: 1.6rem;
    padding: 1rem 1.5rem;
    background-color: $highlight_alt;
    color: $base_grey;
    transition: all .1s ease-out;
    box-shadow:  .1rem 1rem 2rem rgba(#000, 0.6);

    &:hover {
      transform: translateY(-.1rem) scale(1.025);
      background-color: $highlight;
      box-shadow:  .2rem 2rem 2rem rgba(#000, 0.6);
    }
    &:active {
      transform: translateY(0) scale(1);
      box-shadow:  .1rem 1rem 2rem rgba(#000, 0.6);
      background-color: $highlight_alt;
    }
    &--active {
      background-color: $highlight;
    }
  }
}
</style>