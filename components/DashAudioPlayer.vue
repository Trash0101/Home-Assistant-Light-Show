<script setup lang="ts">


import {clearIntervalAsync, setIntervalAsync} from "set-interval-async";


const isMounted = ref(false)
const audioContext = new AudioContext()
const gainNode = audioContext.createGain();
const pannerNode = audioContext.createStereoPanner()
const duration = ref(0)
const setCurrentPosition = (e:number) => {
  if(player.value) {
    player.value.currentTime = Number(e.toFixed(2))
  }
  switchPlay();
  switchPlay();
}
const canvasElement = ref<HTMLCanvasElement | null>(null)
const coverImage = ref<HTMLImageElement| null>(null)
const canvasContext = ref<CanvasRenderingContext2D | null> (null)
const isAudioAnalysed = ref(false)

let toggler = true

const tempo = ref<number>(0);
let beatInterval
let pauseBeatDelay = 0;
const analyser = audioContext.createAnalyser()
const dataArray =ref()


const drawBeatBar = () => {
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  let width = 0
  let height = 0
  const drawVisual = requestAnimationFrame(drawBeatBar);
  dataArray.value = new Uint8Array(bufferLength)
  analyser.getByteFrequencyData(dataArray.value);

  if(canvasContext.value && canvasElement.value) {
    width = canvasElement.value.offsetWidth
    height = canvasElement.value.offsetHeight
    canvasContext.value.clearRect(0, 0, width, height)
    canvasContext.value.fillStyle = "#141018";
    canvasContext.value.fillRect(0, 0, width, height);

    const barWidth = (width / bufferLength);
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray.value[i];

      canvasContext.value.fillStyle = `rgb(${barHeight + 100}, 255, 202)`;
      canvasContext.value.fillRect(x, height - barHeight, barWidth, barHeight * 4);

      x += barWidth + 0.5;
    }
  }
}

const volumeValue = ref(1)
const pannerValue = ref(0)
const player = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const track = ref<MediaElementAudioSourceNode| null>(null)
const currentTimeReadable = '00:00'

const switchPlay = () => {
  if(pauseBeatDelay === 0){(async function  () {
    await $fetch('/api/setLightRand', {
      method: "post"
    })
  })()
  }
  if(beatInterval === undefined){
    beatInterval = setIntervalAsync(async () => {
      setTimeout(()=> {
        console.log(`Delayed for ${pauseBeatDelay}`)
      }, pauseBeatDelay)
      await $fetch('/api/setLightRand', {
        method: "post",
        body: {
          toggler
        }
      })
      toggler = !toggler
    }, (1000 * 60 / tempo.value))

  }
  if(isPlaying.value && player.value) {
    clearIntervalAsync(beatInterval)
    pauseBeatDelay = (1000 * 60 / tempo.value) - ((player.value.currentTime*1000%(1000 * 60 / tempo.value)))
    console.log('STOP')
    isPlaying.value = !isPlaying.value
    player.value?.pause();
    beatInterval = undefined
  } else {
    console.log('START')
    isPlaying.value = !isPlaying.value
    player.value?.play();
    drawBeatBar()
  }
}

const playerStore = usePlayerStore();
const {selectedSong, selectedSongIndex, selectedSongCover} = storeToRefs(playerStore)
watch(selectedSongIndex, () => {
  switchPlay()
  if(selectedSong.value && isMounted.value && player.value){
    console.log('WATCHED INNER')
    player.value.src = selectedSong.value.URL
    track.value = audioContext?.createMediaElementSource(player.value);
    track.value.connect(gainNode).connect(pannerNode).connect(analyser).connect(audioContext.destination)
    duration.value = player.value.duration
    if(canvasElement.value?.getContext('2d')){
      canvasContext.value = canvasElement.value.getContext('2d')
    }
    tempo.value = selectedSong.value.tempo
    isAudioAnalysed.value = true
  }
})

watch(volumeValue, () => {
  gainNode.gain.value = volumeValue.value
})
watch(pannerValue, () => {
  pannerNode.pan.value = pannerValue.value
})

onMounted(()=> {
  if(canvasElement.value){
    canvasElement.value.width = canvasElement.value.offsetWidth
    canvasElement.value.height = canvasElement.value.offsetHeight
  }
  isMounted.value = true
})
onUpdated(()=> {
  if(selectedSongCover.value && coverImage.value){
    coverImage.value.src = selectedSongCover.value
  }
})
// canvasContext.value.clearRect

// const drawWaveform = () => {
//   const drawVisual = requestAnimationFrame(drawWaveform)
//   analyser.getByteTimeDomainData(dataArray)
//
//   let cellWidth = 0
//   let x = 0;
//   let width = 0
//   let height = 0
//   if(canvasContext.value && canvasElement.value){
//     canvasContext.value.fillStyle = "rgb(200, 200, 200)";
//     width = canvasElement.value.offsetWidth
//     height = canvasElement.value.offsetHeight
//     canvasContext.value.fillRect(0, 0, width, height)
//     canvasContext.value.lineWidth = 2
//     canvasContext.value.strokeStyle = "rgb(0, 0, 0)"
//     canvasContext.value.beginPath();
//     cellWidth = canvasElement.value?.offsetWidth / bufferLength
//     for (let i = 0; i < bufferLength; i++) {
//       const v = dataArray[i] / 128.0;
//       const y = v * (height / 2);
//
//       if (i === 0) {
//         canvasContext.value.moveTo(x, y);
//       } else {
//         canvasContext.value.lineTo(x, y);
//       }
//
//       x += cellWidth;
//     }
//     canvasContext.value.lineTo(width, height / 2);
//     canvasContext.value.stroke();
//   }
// }
// const handleUploadedAudio = async (event)=> {
// const file = event.target.files[0]
// const reader = new FileReader()
// let myBuffer: null | ArrayBuffer | string = null
// reader.readAsArrayBuffer(file)
// reader.onload = async () => {
//   myBuffer = reader.result
//   const decodedBuffer = await audioContext.decodeAudioData(myBuffer)
//   tempo.value = await analyze(decodedBuffer)
//   isAudioAnalysed.value = true
// }
// player.value.src = URL.createObjectURL(file)
// track.value = audioContext?.createMediaElementSource(player.value);
// track.value.connect(gainNode).connect(pannerNode).connect(analyser).connect(audioContext.destination)
// console.log(track.value)
// if(canvasElement.value?.getContext('2d')){
//   canvasContext.value = canvasElement.value.getContext('2d')
// }
// }

</script>

<template>
  <div class="player">
    <div v-if="isAudioAnalysed" class="player__cover">
      <img ref="coverImage" class="player__cover--img" src="drowning.jpg" alt="Album Cover">
    </div>
    <audio @ended="switchPlay" class="player__audio" ref="player"></audio>
    <div class="player__icons" >
      <PhPlay @click="switchPlay" v-if="!isPlaying && isAudioAnalysed" weight="fill" size="40"></PhPlay>
      <PhPause @click="switchPlay" v-else-if="isAudioAnalysed" weight="fill" size="40"></PhPause>
    </div>
    <v-slider v-if="isAudioAnalysed" :disabled="!isPlaying" min="0" max="1" class="player__slider" v-model="volumeValue" direction="vertical" thumb-label></v-slider>
    <v-slider v-if="isAudioAnalysed" :disabled="!isPlaying" min="-1" max="1" class="player__slider" v-model="pannerValue" direction="vertical" thumb-label></v-slider>
    <Teleport to=".dash">
      <div class="canvas" ref="canvasContainer">
        <canvas class="canvas__main" ref="canvasElement"></canvas>
      </div>
    </Teleport>
    <div v-if="isAudioAnalysed" class="player__duration">
      <div  class="player__duration--time">{{currentTimeReadable}}</div>
      <v-slider class="player__duration--slider" min="0" :max="player.duration ?? 100" v-model="player.currentTime" @end="setCurrentPosition" thumb-label></v-slider>
    </div>
  </div>

</template>

<style scoped lang="scss">
.dev{
  font-size: 2rem;
  color: white;
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
    align-items: center;
    padding: 2rem;
    grid-row: 1/2;
    grid-column: 2/4;
    object-fit: fill;
    border-radius: 2rem;
    &--img {
      width: 70%;
      height: auto;
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
  }
  &__slider {
    $slider-thumb-font-size: 2rem;
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
  border-radius: 1rem;
  grid-row: 1;
  grid-column: 2/3;
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  height: 100%;
  &__main {
    border-radius: 1rem;
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>