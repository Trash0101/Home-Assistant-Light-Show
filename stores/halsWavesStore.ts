import type {Wave} from "~/types/types";

export const useHalsWavesStore = defineStore('waves', () => {
    const waves = ref<Wave[]>([
        {
            color: '#4da9bb',
            animationDuration: '3s',
            animationDelay: '-4s',
        },
        {
            color: '#3a7f8c',
            animationDuration: '5s',
            animationDelay: '-2s',
        },
        {
            color: '#6de8ff',
            animationDuration: '12s',
            animationDelay: '-2s',
        },
    ])
    const setWaveColor = (index:number, RGB:[number, number, number]) => {
        if(waves.value[index]){
            waves.value[index].color = RGBtoHEX(...RGB)
        } else {
            return false
        }
    }
    const setWavesRhythm = (tempo:number) => {
        const beatDuration = 60/tempo
        waves.value[0].animationDuration = `${beatDuration*16}s`
        waves.value[1].animationDuration = `${beatDuration*8}s`
        waves.value[2].animationDuration = `${beatDuration*4}s`
    }
    const resetToDefault = () => {
        waves.value[0].color =  '#4da9bb'
        waves.value[0].animationDuration = '3s'
        waves.value[0].animationDelay = '-4s'

        waves.value[1].color =  '#3a7f8c'
        waves.value[1].animationDuration = '5s'
        waves.value[1].animationDelay = '-2s'

        waves.value[2].color =  '#6de8ff'
        waves.value[2].animationDuration = '12s'
        waves.value[2].animationDelay = '-2s'
    }
    return {
        waves,
        setWaveColor,
        setWavesRhythm,
        resetToDefault,
    }
})