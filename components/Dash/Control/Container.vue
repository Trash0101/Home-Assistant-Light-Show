  <script setup lang="ts">
  import {DashControlColor, DashControlFlash, DashControlDarkness} from "#components";
  import {defaultSettingCreator} from "#imports";

  const mainStore = useHalsStoreMain()
  const playerStore = usePlayerStore()
  const {selectedLight} = storeToRefs(mainStore)
  const {selectedSongIndex, selectedSong} = storeToRefs(playerStore)
  const switcher = ref<0|1|2>(0)
  const switchedComponent = computed(()=>{
    if(switcher.value===0){
      return DashControlColor
    } else if(switcher.value === 1) {
      return DashControlFlash
    } else if (switcher.value === 2) {
      return DashControlDarkness
    }
  })
  const switchComponent = (num:0|1|2) => {
    switcher.value = num
  }
  const beatSetting = ref([
      '1',
      '2',
      '3',
      '4',
      '1/2',
      '1/4',
      '1/8'
  ])
  const selectedBeat = ref('1')

  const changeLightBeat = (e:string)=> {
    let converted = 1;
    switch(e) {
      case '1':
        converted = 1
            break
      case '2':
        converted = 2
        break
      case '3':
        converted = 3
        break
      case '4':
        converted = 4
        break
      case '1/2':
        converted = 1/2
        break
      case '1/4':
        converted = 1/4
        break
      case '1/8':
        converted = 1/8
        break
      default:
        converted = 1
    }
    selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].beat = converted
  }

  const profileListValues = ref(["No settings"])
  const computedList = computed(()=> {
    const settingsList = []
    if(selectedLight.value && selectedSong.value){
      for(let i = 0; i < selectedLight.value.songSettings[selectedSongIndex.value].settings.length; i++) {
        settingsList.push(`Profile: ${i+1}`)
      }
      return settingsList
    } else {
      return ['No settings']
    }
  })
  const changeSetting = (e:string)=> {
    const converted = Number(e.slice(-1));
    if(!isNaN(converted)) {
      selectedLight.value.selectedSetting = converted - 1
    }
    switchBeatSet()
  }
  const createNewProfile = ()=>{
    if(selectedSong.value){
      selectedLight.value.songSettings[selectedSongIndex.value].settings.push(defaultSettingCreator(selectedSong.value.duration, selectedSong.value.sampleRate))
      selectedLight.value.selectedSetting = selectedLight.value.songSettings[selectedSongIndex.value].settings.length - 1;
    }
  }
  const profileIndex = computed(()=>{
    return  selectedLight.value.selectedSetting
  })
  const switchBeatSet = ()=> {
    switch(selectedLight.value.songSettings[selectedSongIndex.value].settings[selectedLight.value.selectedSetting].beat) {
      case 1:
        selectedBeat.value = '1'
        break
      case 2:
        selectedBeat.value = '2'
        break
      case 3:
        selectedBeat.value = '3'
        break
      case 4:
        selectedBeat.value = '4'
        break
      case 1/2:
        selectedBeat.value = '1/2'
        break
      case 1/4:
        selectedBeat.value = '1/4'
        break
      case 1/8:
        selectedBeat.value = '1/8'
        break
      default:
        selectedBeat.value = '1'
    }
  }
  const emits = defineEmits<{
    (e: 'closeSettings'): void
  }>()
  const closeSettings = ()=> {
    emits('closeSettings')
  }
  onMounted(()=>{
    selectedLight.value.selectedSetting = 0
    switchBeatSet()
  })
  watch(selectedSongIndex, ()=> {
    selectedLight.value.selectedSetting = 0
    switchBeatSet()
  })
  </script>

  <template>
  <div class="control-container" v-if="selectedLight && selectedSongIndex != -1">
    <dash-control-timeline></dash-control-timeline>
    <KeepAlive>
      <component :is="switchedComponent"></component>
    </KeepAlive>
    <section class="global-settings">
        <span class="global-settings__label">How frequent are changes ?</span>
        <v-select class="global-settings__beat-frequency" variant="underlined" @update:modelValue="changeLightBeat" v-model="selectedBeat" :items="beatSetting"></v-select>
        <span class="global-settings__label">Current setting profile for the light/song combo</span>
        <div class="global-settings__profiles">
          <v-select class="global-settings__profiles--list" variant="underlined" :counter="true" :items="computedList" @update:modelValue="changeSetting" :modelValue="computedList[profileIndex]"></v-select>
          <PHPlusCircle class="global-settings__profiles--icon" size="30" weight="fill" @click="createNewProfile"></PHPlusCircle>
        </div>
        <span class="global-settings__label">Selected song BPM</span>
          <span class="global-settings__label--bpm">{{Math.round(selectedSong.tempo)}}</span>
    </section>
    <div class="switcher">
      <PHCircle @click="switchComponent(0)" :class="{'switcher__button--active': switcher == 0}" class="switcher__button" weight="fill" size="20"></PHCircle>
      <PHCircle @click="switchComponent(1)" :class="{'switcher__button--active': switcher == 1}" class="switcher__button" weight="fill" size="20"></PHCircle>
      <PHCircle @click="switchComponent(2)" :class="{'switcher__button--active': switcher == 2}" class="switcher__button" weight="fill" size="20"></PHCircle>
    </div>
    <PHX @click="closeSettings" class="control-container__close" weight="light" size="40"></PHX>
  </div>
  <div v-else class="control-container__error">
    <div class="control-container__error--message">Please select song and light to start editing the settings</div>
  </div>
  </template>

  <style scoped lang="scss">
  .control-container{
    position: relative;
    padding: 2rem;
    grid-row: 2/5;
    grid-column: 2/3;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    border-radius: 1rem;
    z-index: 3;
    display: grid;
    background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 4fr 5%;
    &__close {
      position: absolute;
      right: 2rem;
      top: 2rem;
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
    &__error {
      padding: 4rem;
      grid-row: 2/5;
      grid-column: 2/3;
      border-radius: 1rem;
      background: linear-gradient(to bottom, $base_color 80%,  rgba($base_color_light, 0.1) 99%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &--message {
        font-size: 2.4rem;
        //transform: translate(-50%, -50%);
        color: $highlight_alt;
      }
    }
  }
  .global-settings{
    padding: 2rem;
    display: flex;
    flex-direction: column;
    grid-column: -2;
    grid-row: 2;
    height: 100%;
    align-items: center;
    justify-content: center;
    &__beat-frequency{
      align-self: flex-start;
      flex-grow: 0;
      color: $highlight_alt;
    }
    &__label {
      text-align: left;
      font-size: 1.6rem;
      display: block;
      width: 100%;
      color: $font_color;
      margin-bottom: 1rem;
      &--bpm {
        font-size: 2.4rem;
        color: $highlight_alt;
        width: 100%;
        text-align: left;
      }
    }
    &__profiles {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2rem;
      &--icon {
        color: $highlight_alt;
        transition: all .1s ease-out;
        &:hover {
          transform: translateY(-.1rem) scale(1.025);
          color: $highlight
        }
        &:active {
            transform: translateY(0) scale(1);
            color: $highlight_alt;
        }
      }
      &--list {
        color: $highlight_alt;
        transition: all .1s ease-out;
        &:hover {
          transform: translateY(-.1rem) scale(1.025);
          color: $highlight
        }
        &:active {
          transform: translateY(0) scale(1);
          color: $highlight_alt;
        }
      }
    }
  }
  .switcher{
    grid-row: 3;
    grid-column: 1/-1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    &__button {
      color: $highlight_alt;
      transition: all .1s ease-out;
      &:hover {
        transform: translateY(-.1rem) scale(1.025);
      }
      &:active {
        transform: translateY(0) scale(1);
        color: $highlight_alt;
      }
      &--active {
        color: $highlight;
      }
    }
  }
  </style>