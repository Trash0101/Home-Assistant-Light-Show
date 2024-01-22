<script setup lang="ts">
import {useHalsWavesStore} from "~/stores/halsWavesStore";

const wavesStore = useHalsWavesStore()
const {waves} = storeToRefs(wavesStore)

const firstWaveAnimation = ref(`animation-delay:${waves.value[0].animationDelay}; animation-duration:${waves.value[0].animationDuration}`)

const secondWaveAnimation = ref(`animation-delay:${waves.value[1].animationDelay}; animation-duration:${waves.value[1].animationDuration}`)

const thirdWaveAnimation = ref(`animation-delay:${waves.value[2].animationDelay}; animation-duration:${waves.value[2].animationDuration}`)
watch(waves, ()=> {
  console.log(waves.value)
  firstWaveAnimation.value = `animation-delay:${waves.value[0].animationDelay}; animation-duration:${waves.value[0].animationDuration}`

  secondWaveAnimation.value = `animation-delay:${waves.value[1].animationDelay}; animation-duration:${waves.value[1].animationDuration}`

  thirdWaveAnimation.value = `animation-delay:${waves.value[2].animationDelay}; animation-duration:${waves.value[2].animationDuration}`
}, {
  deep: true
})
</script>

<template>
      <slot/>

  <svg class="editorial"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       viewBox="0 24 150 28"
       preserveAspectRatio="none">
    <defs>
      <path id="gentle-wave"
            d="M-160 44c30 0
    58-18 88-18s
    58 18 88 18
    58-18 88-18
    58 18 88 18
    v44h-352z" />
    </defs>
    <g class="parallax">
      <use :style="firstWaveAnimation" xlink:href="#gentle-wave" x="50" y="0" :fill="waves[2].color"/>
      <use :style="secondWaveAnimation" xlink:href="#gentle-wave" x="50" y="3" :fill="waves[1].color"/>
      <use :style="thirdWaveAnimation" xlink:href="#gentle-wave" x="50" y="6" :fill="waves[0].color"/>
    </g>
  </svg>
</template>

<style scoped lang="scss">

.slot * {
  z-index: 2;
}
::selection{background-color: #c72e1c; color: white;}
.parallax > use{
  animation:move-forever 12s linear infinite;
  //&:nth-child(1){animation-delay:-2s; animation-duration:12s}
  //&:nth-child(2){animation-delay:-2s; animation-duration:8s}
  //&:nth-child(3){animation-delay:-4s; animation-duration:4s}
}

@keyframes move-forever{
  0%{transform: translate(-90px , 0%)}
  100%{transform: translate(85px , 0%)}
}

.editorial {
  display: block;
  width: 100%;
  height: 15rem;
  max-height: 100vh;
  margin: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
}

/*prevent many large-by-comparison ripples by shrinking the height*/
@media (max-width:50em){
  .content h1{font-size: 12vmax}
  .editorial{height:17vw;}
}

</style>