<script setup lang="ts">

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
      <use xlink:href="#gentle-wave" x="50" y="0" fill="#6de8ff"/>
      <use xlink:href="#gentle-wave" x="50" y="3" fill="#3a7f8c"/>
      <use xlink:href="#gentle-wave" x="50" y="6" fill="#4da9bb"/>
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
  &:nth-child(1){animation-delay:-2s;}
  &:nth-child(2){animation-delay:-2s; animation-duration:5s}
  &:nth-child(3){animation-delay:-4s; animation-duration:3s}
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