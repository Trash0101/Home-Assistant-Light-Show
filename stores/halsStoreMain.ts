import type {Light, SpecifiedSetting, SpecifiedSettingBeats} from "~/types/types";
import errorLight from "~/composables/errorLight";
import {computed} from "vue";
export const useHalsStoreMain = defineStore('main', () => {
    const playerStore = usePlayerStore()
    const {selectedSong, selectedSongIndex} = storeToRefs(playerStore);
    const lightsList = ref<Light[]>([])
    const numOfLights = computed(()=> {
        return lightsList.value?.length
    })
    const getLightIndex = (id:string) => {
            return lightsList.value.findIndex(elStore => {
                return elStore.entity_id === id
            }) ?? -1
    }
    const selectedLightIndex = ref(-1)
    const selectedLight = computed(() => {
        return lightsList.value[selectedLightIndex.value]
    })
    const selectedLightExists = computed(() => {
        return !!selectedLight.value
    })
    const setSelectedLight = (id:string) => {
        selectedLightIndex.value = lightsList.value.findIndex(el => {
           return el.entity_id === id
        })
    }
    const setSelectedLightIndex = (index:number) => {
        selectedLightIndex.value = index
    }

    const lightExists = (id:string) => {
        return !!lightsList.value.find(el => {
            return el.entity_id === id;
            }) ?? false
    }
    const lampTempoGroups = computed(()=> {
        console.log('Lamp Tempo Groups CHANGED NIGGA!')
        if(selectedSong.value){
            const settings:SpecifiedSettingBeats = {
                one: [],
                two: [],
                three: [],
                four: [],
                oneHalf: [],
                oneFourth: [],
                oneEight: []
            }
            lightsList.value.forEach((el, index)=> {
                const lampId = el.entity_id;
                el.songSettings[selectedSongIndex.value].settings.forEach((elInner, indexInner)=> {
                    switch(elInner.beat){
                        case 1:
                            settings.one.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        case 2:
                            settings.two.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        case 3:
                            settings.three.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        case 4:
                            settings.four.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        case 1/2:
                            settings.oneHalf.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        case 1/4:
                            settings.oneFourth.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        case 1/8:
                            settings.oneEight.push({
                                entity_id: lampId,
                                ...elInner
                            })
                            break
                        default:
                            settings.one.push({
                                entity_id: lampId,
                                ...elInner
                            })
                    }
                })
            })
            return settings
        } else {
            return false
        }
    })
    const setLights = (args:Light[]) => {
        args.forEach(el => {
            if(!lightExists(el.entity_id)) {
                if(lightsList.value) {
                    lightsList.value.push({
                        ...el,
                        songSettings: []
                    })
                }
            } else {
                const indexOfExistingLight = getLightIndex(el.entity_id)
                lightsList.value[indexOfExistingLight] = el
            }
        })
    }
    const setLightSettings = () => {
        if(playerStore.selectedSong){

        } else {
            return false
        }
    }

    return {
        lightsList,
        numOfLights,
        getLightIndex,
        selectedLightIndex,
        selectedLight,
        selectedLightExists,
        setSelectedLightIndex,
        setSelectedLight,
        lightExists,
        setLights,
        lampTempoGroups,
    }
})