import type {Light} from "~/types/types";
import errorLight from "~/composables/errorLight";
import {computed} from "vue";

export const useHalsStoreMain = defineStore('main', () => {
    const lightsList = ref<Light[]>([])
    const numOfLights = computed(()=> {
        return lightsList.value?.length
    })
    const getLightIndex = (id:string) => {
            return lightsList.value.findIndex(elStore => {
                return elStore.entity_id === id
            }) ?? -1
    }
    const getLight = (id:string):Light => {
        const foundLight = lightsList.value.find((el) => {
            return el.entity_id === id
        })
        if(foundLight === undefined){
            return errorLight
        }
        return foundLight
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
    // const setLightRGBA = (args:number[], index:number) => {
    //     lightsList.value[index].attributes.rgb_color[0] = args[0]
    //     lightsList.value[index].attributes.rgb_color[1] = args[1]
    //     lightsList.value[index].attributes.rgb_color[2] = args[2]
    //     lightsList.value[selectedLightIndex.value].attributes.brightness = args[3]
    //
    // }
    const setLights = (args:Light[]) => {
        args.forEach(el => {
            if(!lightExists(el.entity_id)) {
                if(lightsList.value) {
                    lightsList.value.push(el)
                }
            } else {
                const indexOfExistingLight = getLightIndex(el.entity_id)
                lightsList.value[indexOfExistingLight] = el
            }
        })
    }

    return {
        lightsList,
        numOfLights,
        getLightIndex,
        getLight,
        selectedLightIndex,
        selectedLight,
        selectedLightExists,
        setSelectedLightIndex,
        setSelectedLight,
        lightExists,
        setLights
    }
})