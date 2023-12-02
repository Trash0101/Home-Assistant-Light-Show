<script setup lang="ts">
import {usePlayerStore} from "#imports";
import DashSongsListSong from "~/components/DashSongsListSong.vue";

const playerStore = usePlayerStore()
const {songsList} = storeToRefs(playerStore)
const handleFileUpload = async (event) => {
  console.log(event.target.files)
  const res = await playerStore.addSongs(event.target.files)
  console.log(res);
}
</script>

<template>
<div class="song-list">
  <dash-songs-list-song v-if="songsList[0]" v-for="(song, index) in songsList"
                        :key="song.id"
                        :song="song"
                        :songIndex="index"></dash-songs-list-song>
  <div v-else class="song-list__error">
    Upload some songs to begin
    <input @change="handleFileUpload" id="files" style="display: none" type="file" accept="audio/mp3">
    <label class="song-list__input" for="files">Upload file</label>
  </div>
  <input @change="handleFileUpload" id="files" style="display: none" type="file" accept="audio/mp3">
  <label class="song-list__input" for="files">Upload file</label>
</div>
</template>

<style scoped lang="scss">
.song-list{
  font-size: 1.5rem;
  grid-row: 1/-1;
  grid-column: 3/4;
  border-radius: 1rem;
  background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
  display: flex;
  padding: 1.5rem 2rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: $font_color;
  &__input {
    color: $font_color;
    display:block;
    font-size: 2rem;
    text-decoration: underline;
    cursor: pointer;
    transition: all .1s ease-out;
    text-align: center;
    &:hover{
      color: $highlight;
      transform: translateY(-.2rem) scale(1.05);
    }
    &:active {
      transform: translateY(0) scale(1);
    }
  }
}
</style>