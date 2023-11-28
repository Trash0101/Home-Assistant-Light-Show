import type {Light} from "~/types/types";

export const useHalsStoreMain = defineStore('main', () => {
    const lightsList = ref<Light[]>([])
    const numOfLights = computed(()=> {
        return lightsList.value?.length
    })
    const getLightIndex = (id:string) => {
        return lightsList.value.findIndex(elStore => {
            return elStore.entity_id === id
        })
    }
    const selectedLight = ref<string|null>(null);
    const setSelectedLight = (id:string) => {
        selectedLight.value =  id
    }
    const getSelectedLight = computed(() => {
        return selectedLight.value
    })

    const getLight = (id:string) => {
        if(lightsList.value){
            return lightsList.value.find((el) => {
                return el.entity_id === id
            })
        } else {
            return null
        }
    }
    const lightExists = (id:string) => {
        if(lightsList.value){
            return !!lightsList.value.find(el => {
                return el.entity_id === id;
            })
        } else {
            return false;
        }
    }
    const setLightRGBA = (args:number[], id:string) => {
        const indexOfExistingLight = getLightIndex(id)
        lightsList.value[indexOfExistingLight].attributes.rgb_color[0] = args[0]
        lightsList.value[indexOfExistingLight].attributes.rgb_color[1] = args[1]
        lightsList.value[indexOfExistingLight].attributes.rgb_color[2] = args[2]
        lightsList.value[indexOfExistingLight].attributes.brightness = args[3]
    }
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
        getLight,
        getLightIndex,
        lightExists,
        setLights,
        selectedLight,
        setSelectedLight,
        getSelectedLight,
        setLightRGBA
    }
})