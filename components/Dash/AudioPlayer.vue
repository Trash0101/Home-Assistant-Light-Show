<script setup lang="ts">


import {clearIntervalAsync, setIntervalAsync} from "set-interval-async";
import Meyda, {MeydaAnalyzer} from "meyda";
import type {APILightSetting, SpecifiedSetting, SpecifiedSettingBeatsTimeline} from "~/types/types";


//Initializing a lot of thing required for this thing to work
const mainStore = useHalsStoreMain()
const {selectedLight, lampTempoGroups} = storeToRefs(mainStore)
const playerStore = usePlayerStore();
const {selectedSong, selectedSongIndex} = storeToRefs(playerStore)

const isMounted = ref(false)

const isAudioAnalysed = ref(false)
const tempo = ref<number>(0);

let meydaAnalyzer:MeydaAnalyzer
let mediaAnalyzerData:number[] = []
const meydaBufferSize = 512;

const audioContext = new AudioContext()
const gainNode = audioContext.createGain();
const duration = ref(0)
let firstSongInit = false
const setCurrentPosition = (e:number) => {
  if(player.value) {
    player.value.currentTime = Number(e.toFixed(2))
  }
  switchPlay();
  switchPlay();
}
//All things related to drawing canvas on a page with frequency bars
const canvasElement = ref<HTMLCanvasElement | null>(null)
const coverImage = ref<HTMLImageElement| null>(null)
const canvasContext = ref<CanvasRenderingContext2D | null> (null)

const canvasHeight = computed(()=>{
  if(canvasElement.value){
    return canvasElement.value.offsetHeight
  } else {
    return 150
  }
})
const canvasWidth = computed(()=>{
  if(canvasElement.value){
    return canvasElement.value.offsetWidth
  } else {
    return 300
  }
})
const drawBeatBar = () => {
  let width = 0
  let height = 0
  const drawVisual = requestAnimationFrame(drawBeatBar);

  if(canvasContext.value && canvasElement.value) {
    width = canvasWidth.value
    height = canvasHeight.value
    canvasContext.value.clearRect(0, 0, width, height)
    canvasContext.value.fillStyle = "#141018";
    canvasContext.value.fillRect(0, 0, width, height);
    const barWidth = (width / (meydaBufferSize/2));
    let barHeight;
    let x = 0;
    for (let i = 0; i < meydaBufferSize; i++) {
      const calcPercent = () => {
        if(!meydaAnalyzer) {
          return 0
        }
        else {
          return height*(1000*(mediaAnalyzerData[i])/(audioContext.sampleRate/2))
        }
      }
      barHeight = calcPercent();

      canvasContext.value.fillStyle = `rgb(${barHeight + 100}, 255, 202)`;
      canvasContext.value.fillRect(x, height, barWidth , -barHeight);

      x += barWidth + 0.5;
    }
  }
}

const volumeValue = ref(1)
const player = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const track = ref<MediaElementAudioSourceNode| null>(null)
const currentTimeReadable = ref('00:00')
const currentTime = ref(0);
const loopSetting = ref<0|1|2>(0)
const currentBeat = computed(()=> {
  if(currentTime.value && tempo.value){
    return Math.ceil(currentTime.value / (60/tempo.value))
  }
})
const updateCurrentTime = (event)=>{
  if(player.value){
    currentTime.value = player.value.currentTime
    const minutes = Math.floor(player.value.currentTime / 60) >= 10 ? Math.floor(player.value.currentTime / 60) : `0${Math.floor(player.value.currentTime / 60)}`
    const seconds = Math.floor(player.value.currentTime % 60) >= 10 ? Math.floor(player.value.currentTime % 60) : `0${Math.floor(player.value.currentTime % 60)}`
    currentTimeReadable.value = (`${minutes}:${seconds}`)
  }
}
const beatArrayCreate = () => {
  return new Array(7).fill(0)
}
const previousRolloffs = beatArrayCreate()
const beatIntervals = beatArrayCreate()
const pauseBeatDelays = beatArrayCreate()
const beatMultipliers = [
    1,
    2,
    3,
    4,
    0.5,
    0.25,
    0.125,
]
const specifiedSettingsByBeatAndTimeline = computed(()=> {
  // const settings = mainStore.lampTempoGroups
  const startTimer = performance.now()
  if(lampTempoGroups.value) {
    // const settings:SpecifiedSettingBeatsTimeline = {
    //   one: lampTempoGroups.value.one.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value),
    //   two: lampTempoGroups.value.two.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value),
    //   three: lampTempoGroups.value.three.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value),
    //   four: lampTempoGroups.value.four.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value),
    //   oneHalf: lampTempoGroups.value.oneHalf.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value),
    //   oneFourth: lampTempoGroups.value.oneFourth.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value),
    //   oneEight: lampTempoGroups.value.oneEight.filter(el => el.timeRange[0] < currentTime.value && el.timeRange[1] > currentTime.value)
    // }
    const settings:SpecifiedSetting[][] = new Array(7)
    settings[0] = lampTempoGroups.value.one.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)
    settings[1] = lampTempoGroups.value.two.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)
    settings[2] = lampTempoGroups.value.three.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)
    settings[3] = lampTempoGroups.value.four.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)
    settings[4] = lampTempoGroups.value.oneHalf.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)
    settings[5] = lampTempoGroups.value.oneFourth.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)
    settings[6] = lampTempoGroups.value.oneEight.filter(el => el.timeRange[0] < currentTime.value + 0.1 && el.timeRange[1] > currentTime.value)

    const endTimer = performance.now()
    console.log(`Analyzing song settings beforehand took ${endTimer-startTimer}ms`)
    return settings
  }
  else {
    return false
  }
})

const intervalCleaner = ()=> {
  beatIntervals.forEach((el, index) => {
    if(el){
      clearInterval(beatIntervals[index])
      beatIntervals[index] = 0
    }
  })
}
const pauseBeatDelaysCalc = (currentTime:number ,specifiedTempo:number):number => {
  return (1000 * 60 / Math.round(specifiedTempo)) - ((currentTime*1000%(1000 * 60 / Math.round(specifiedTempo))))
}
const pauseBeatDelaysSetter = () => {
  if(player.value){
    pauseBeatDelays.forEach((el, index) => {
      pauseBeatDelays[index] = pauseBeatDelaysCalc(player.value.currentTime, tempo.value/beatMultipliers[index])
    })
  } else {
    return false
  }
}

const intervalInitialyzer = (index:number) => {
  setTimeout(()=> {
    beatIntervals[index] = setInterval(async ()=> {
      const lamps:string[] = []
      const lampSettings:APILightSetting[] = []
      if(specifiedSettingsByBeatAndTimeline.value){
        specifiedSettingsByBeatAndTimeline.value[index].forEach((el:SpecifiedSetting) =>{
          lamps.push(el.entity_id)
          if(el.random){
            lampSettings.push({
              mode: 'color',
              random: true,
            })
          } else {
            if((soundFeatures.value.spectralRolloff > el.ranges.darkness.frequency[0]
                    && soundFeatures.value.spectralRolloff < el.ranges.darkness.frequency[1])
                    || previousRolloffs[0] - soundFeatures.value.spectralRolloff > el.ranges.darkness.difference){
              lampSettings.push({
                mode: 'darkness'
              })
            } else if((soundFeatures.value.spectralRolloff > el.ranges.flash.frequency[0]
                    && soundFeatures.value.spectralRolloff < el.ranges.flash.frequency[1])
                    || soundFeatures.value.spectralRolloff  - previousRolloffs[0]   > el.ranges.flash.difference) {
              lampSettings.push({
                mode: 'flash'
              })
            } else {
              if(!el.ranges.color.range) {
                lampSettings.push({
                  mode: 'color',
                  random: false,
                  color: {
                    brightness: Math.round(((soundFeatures.value.spectralRolloff - el.ranges.darkness.frequency[1])/(el.ranges.flash.frequency[0] - el.ranges.darkness.frequency[1]))
                        *(el.ranges.color.brightness[1] - el.ranges.color.brightness[0])
                        +el.ranges.color.brightness[0]),
                    color: el.ranges.color.colors[largestChromaIndex.value]
                  },
                })
              }else{
                lampSettings.push({
                  mode: 'color',
                  random: false,
                  color: {
                    brightness: Math.round(((soundFeatures.value.spectralRolloff - el.ranges.darkness.frequency[1])/(el.ranges.flash.frequency[0] - el.ranges.darkness.frequency[1]))
                        *(el.ranges.color.brightness[1] - el.ranges.color.brightness[0])
                        +el.ranges.color.brightness[0]),
                    colorRange: el.ranges.color.colorRanges[largestChromaIndex.value]
                  },
                })
              }
            }
          }
        })
        previousRolloffs[0] = soundFeatures.value.spectralRolloff
        console.log(lamps)
        console.log(lampSettings)
        await $fetch('/api/setLightParams', {
          method:"post",
          body: {
            id:lamps,
            settings: lampSettings,
          }
        })
        pauseBeatDelays[index] = 0
        console.log(beatMultipliers[index]);
        console.log(index)
      }
    }, (1000 * 60 / (tempo.value/beatMultipliers[index])))
  }, pauseBeatDelays[index])
}
const switchPlay = async () => {
  if(isPlaying.value && player.value) {
    //Clearing all intervals to stop API calls
    intervalCleaner()
    //Writing down time until next beat so that API calls stay in sync with the beat after rewind or pause
    pauseBeatDelaysSetter()
    isPlaying.value = !isPlaying.value
    if(meydaAnalyzer){
      meydaAnalyzer.stop()
    }
    player.value?.pause();
  } else {
    if(meydaAnalyzer){
      meydaAnalyzer.start()
    }
    isPlaying.value = !isPlaying.value
    await player.value?.play();
    let startTime = performance.now()
    if(specifiedSettingsByBeatAndTimeline.value){
      await nextTick()
      specifiedSettingsByBeatAndTimeline.value.forEach((el, index) => {
        console.log(el)
        if(el.length > 0) {
          console.log('Index', index)
          intervalInitialyzer(index);
        }
      })
    }
    let endTime = performance.now()
    console.log(`Creating and sending request took ${endTime-startTime}ms`)
    drawBeatBar()
  }
}
//This function handles end of playback depending on loop settings
const endOfPlayback = () =>{
  switch(loopSetting.value){
    case 0:
      if(playerStore.songsList.length-1 !== selectedSongIndex.value){
        playerStore.setSelectedSong(playerStore.selectedSongIndex+1)
      } else {
        switchPlay()
      }
      break
    case 1:
      playerStore.setSelectedSong(playerStore.selectedSongIndex+1)
      break
    case 2:
      break
  }
}
//Loop settings 0 is no loop
//Loop setting 1 is loop
//Loop setting 2 is loop on one song
const changeLoopSetting = () => {
  switch(loopSetting.value){
    case 0:
      loopSetting.value = 1
        if(playerStore.songsList.length === 1) {
          loopSetting.value = 2
        }
      break
    case 1:
      loopSetting.value = 2
      break
    case 2:
      loopSetting.value = 0
  }
}

const nextSong = () =>{
  playerStore.setSelectedSong(selectedSongIndex.value+1)
}
const previousSong = () =>{
  if(player.value){
    //This is a functionality that provides a way to rewind to the start of the song
    if(player.value.currentTime < 5 && selectedSongIndex.value !== 0) {
      playerStore.setSelectedSong(selectedSongIndex.value-1)
    } else {
      player.value.currentTime = 0
      switchPlay()
      switchPlay()
    }
  }
}
//Boolean value that changes once the first song was uploaded and MediaElementSource was written to track.value for further analysis
let isAudioElementInit = false
const analyser = audioContext.createAnalyser()
watch(selectedSongIndex, () => {

  switchPlay()
  if(selectedSong.value && isMounted.value && player.value){
    player.value.src = selectedSong.value.URL
    if(!isAudioElementInit){
      track.value = audioContext?.createMediaElementSource(player.value);
      isAudioElementInit = true
    }
    track.value.connect(gainNode).connect(analyser).connect(audioContext.destination)
    duration.value = player.value.duration
    if(canvasElement.value?.getContext('2d')){
      canvasContext.value = canvasElement.value.getContext('2d')
    }
    if(!selectedSong.value.duration) {
      selectedSong.value.duration = player.value.duration
    }
    tempo.value = selectedSong.value.tempo
    isAudioAnalysed.value = true
  }
  switchPlay()
})

watch(volumeValue, () => {
  gainNode.gain.value = volumeValue.value
})
const soundFeatures = ref<
    {
      spectralCentroid: number
      spectralRolloff: number
      spectralSpread: number
      loudness: number
      chroma: number[],
    }
>({
  spectralCentroid: 0,
  spectralRolloff: 0,
  spectralSpread: 0,
  loudness: 0,
  chroma: [],
})
const largestChromaIndex = computed(()=>{
  let largest = 0;
  let index = 0;
  if(soundFeatures.value.chroma){
    soundFeatures.value.chroma.forEach((el, i) => {
      if(el > largest) {
        largest = el
        index = i
      }
    })
  }
  return index
})

const showSoundFeatures = ref(false)
watch(track, ()=> {
  //Math transformations for future audio analyze features
  const clamp = (a:number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const inverseLin = (x:number, y:number, a:number) => clamp((a - x) / (y - x));
  meydaAnalyzer = Meyda.createMeydaAnalyzer({
    audioContext,
    source: track.value,
    bufferSize: meydaBufferSize,
    sampleRate: audioContext.sampleRate,
    featureExtractors: ["amplitudeSpectrum", "spectralCentroid", "spectralRolloff", "spectralSpread","chroma", "loudness"],
    callback: (features)=> {
      soundFeatures.value.spectralCentroid = features.spectralCentroid
      soundFeatures.value.spectralRolloff = features.spectralRolloff
      soundFeatures.value.spectralSpread = features.spectralSpread
      soundFeatures.value.chroma = [...features.chroma]
      soundFeatures.value.loudness = inverseLin(3, 50,features.loudness.total)
      mediaAnalyzerData = features.amplitudeSpectrum
    }
  })
  showSoundFeatures.value = true
})

onMounted(async ()=> {
  await nextTick()
  isMounted.value = true
})
watch(canvasElement, ()=> {
  if(canvasElement.value) {
    canvasElement.value.width = canvasElement.value.offsetWidth
    canvasElement.value.height = canvasElement.value.offsetHeight
  }
})

</script>

<template>
  <div class="player">
    <div v-if="isAudioAnalysed" class="player__cover">
      <img ref="coverImage" class="player__cover--img" :src="selectedSong.cover" alt="Album Cover">
    </div>
    <audio @timeupdate="updateCurrentTime" @ended="endOfPlayback" class="player__audio" :loop="loopSetting === 2" ref="player"></audio>
    <div v-if="isAudioAnalysed" class="player__icons" >
      <PhSkipBack @click="previousSong" class="player__icons--icon" weight="fill" size="60"></PhSkipBack>
      <PhPlay class="player__icons--icon" @click="switchPlay" v-if="!isPlaying" weight="fill" size="90"></PhPlay>
      <PhPause class="player__icons--icon" @click="switchPlay" v-else weight="fill" size="90"></PhPause>
      <PhSkipForward @click="nextSong" class="player__icons--icon" weight="fill" size="60"></PhSkipForward>
    </div>
    <v-slider v-if="isAudioAnalysed" :disabled="!isPlaying" min="0" max="1" class="player__slider" v-model="volumeValue" direction="vertical" thumb-label></v-slider>
    <div v-if="isAudioAnalysed" class="player__repeat">
      <PhRepeat class="repeat--button" :class="{'repeat--button--active': loopSetting === 1}" v-if="loopSetting == 0 || loopSetting == 1" @click="changeLoopSetting" weight="fill" size="60"></PhRepeat>
      <PhRepeatOnce class="repeat--button repeat--button--active" v-else weight="fill" size="60" @click="changeLoopSetting"></PhRepeatOnce>
    </div>
    <Teleport to=".dash">
      <div class="canvas" ref="canvasContainer">
        <canvas class="canvas__main" ref="canvasElement"></canvas>
      </div>
    </Teleport>
    <div v-if="isAudioAnalysed" class="player__duration">
      <div  class="player__duration--time">{{currentTimeReadable}}</div>
      <v-slider class="player__duration--slider" min="0" :max="player.duration ?? 100" v-model="currentTime" @end="setCurrentPosition"></v-slider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.analyze_values{
  position: absolute;
  bottom: -10rem;
  height: 100rem;
  width: 50rem;
  background: white;
  color: black;
  font-size: 2rem;
}
.dev{
  font-size: 2rem;
  color: white;
}

.repeat--button {
  color: $highlight_alt;
  transition: all .1s ease-out;
  &:hover{
    transform: translateY(-.2rem) scale(1.05);
    cursor: pointer;
  }
  &:active {
    transform: translateY(0) scale(1);
    color: $highlight
  }
  &--active {
    color: $highlight
  }
}
.frequency__data {
  display: flex;
  flex-wrap: wrap;
  grid-row: 3;
  grid-column: 1/-1;
}
.player {
  padding: 2rem;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row: 2/5;
  grid-column: 2/3;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  border-radius: 1rem;
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  &__cover {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    grid-row: 1/2;
    grid-column: 2/4;
    object-fit: fill;
    border-radius: 2rem;
    height: 25rem;
    overflow: hidden;
    &--img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
  &__audio {
    grid-row: 2;
    grid-column: 2/4;
  }
  &__icons {
    grid-row: 2;
    grid-column: 2/4;
    color: $highlight_alt;
    display: flex;
    align-items: center;
    justify-items: center;

    &--icon{
      letter-spacing: 0;
      margin: 2rem;
      transition: all .1s ease-out;
      &:hover{
        transform: translateY(-.2rem) scale(1.05);
        cursor: pointer;
      }
      &:active {
        transform: translateY(0) scale(1);
        color: $highlight
      }
    }
  }
  &__slider {
    $slider-thumb-font-size: 2rem;
    height: 20rem;
  }
  &__duration{
    grid-row: 3;
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    &--slider {
      width: 100%;
      padding: 5rem;
    }
    &--time {
      font-size: 2rem;
      text-align: center;
      color: $highlight_alt;
    }
  }

}
.canvas {
  //border-radius: 1rem;
  grid-row: 1;
  grid-column: 2/3;
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  height: 100%;
  position: relative;
  &__main {

    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>