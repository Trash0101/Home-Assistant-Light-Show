import type {Light} from "~/types/types";

export const useHalsStoreMain = defineStore('main', () => {
    const lightsList = ref<Light[]>()
    const numOfLights = computed(()=> {
        return lightsList.value?.length
    })
})