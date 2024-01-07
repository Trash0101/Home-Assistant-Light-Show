<script setup lang="ts">
import type {Song} from "~/types/types";
import type {Ref} from "vue";
const playerStore = usePlayerStore()
const props = defineProps<{
  song: Song
  songIndex: number
}>()
const image:Ref<HTMLImageElement|null> = ref(null);
const {selectedSongIndex} = storeToRefs(playerStore)
const selectSong = async () => {
  await playerStore.setSelectedSong(props.songIndex)
}
const isActive = computed(()=>{
  return selectedSongIndex.value === props.songIndex;
})


const metaInfo = ref({
  album: props.song.metaData?.album !== ''? props.song.metaData?.album : 'Unknown',
  artist: props.song.metaData?.artist !== ''? props.song.metaData?.artist : 'Unknown',
  title: props.song.metaData?.title !== ''? props.song.metaData?.title : `Track ${props.songIndex+1}`,
})

</script>

<template>
  <div @click="selectSong" :class="{active: isActive}" class="song--container">
      <div class="song--container__title">{{metaInfo.title}}</div>
      <div class="song--container__album">{{metaInfo.album}}</div>
      <div class="song--container__artist">{{metaInfo.artist}}</div>
    <img class="song--container__cover" :src="props.song.cover" alt="cover" ref="image">
  </div>
</template>

<style scoped lang="scss">
.active{
  border-bottom: .2rem solid $highlight;
}
.song--container {
  overflow: hidden;
  padding: 1.5rem 2rem;
  width: 100%;
  min-height: 8rem;
  position: relative;
  border-radius: 1rem;
  box-shadow:  .1rem 1rem 2rem rgba(#000, 0.6);
  transition: all .1s ease-out;
  margin-bottom: 2rem;
  &:hover{
    transform: translateY(-.2rem) scale(1.05);
    box-shadow:  .2rem 2rem 2rem rgba(#000, 0.6);
    cursor: pointer;
  }
  &:active {
    transform: translateY(0) scale(1);
    box-shadow:  .1rem 1rem 2rem rgba(#000, 0.6);
    outline: .75rem solid $highlight_alt;
  }
  &__title{
    position: relative;
    z-index: 3;
    font-weight: 700;
    font-size: 1.6rem;
    text-shadow: .1rem .2rem .3rem black;
  }
  &__album{
    position: relative;
    z-index: 3;
    font-size: .8rem;
    text-shadow: .1rem .2rem .3rem black;
  }
  &__artist{
    position: relative;
    z-index: 3;
    font-size: .8rem;
    text-shadow: .1rem .2rem .3rem black;
  }
  &__cover{
    width: 100%;
    height: auto;
    z-index: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
  }
}
</style>