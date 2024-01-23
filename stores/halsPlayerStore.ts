import {defineStore} from "pinia";
import type {Light, Song} from "~/types/types";
import {analyze} from "web-audio-beat-detector";
import MP3Tag from "mp3tag.js";
import {useHalsStoreMain} from "~/stores/halsStoreMain";
import Meyda from "meyda";
import {AudioContext} from "standardized-audio-context";
import defaultSettingCreator from "~/composables/defaultSettingCreator";
export const usePlayerStore = defineStore('player', ()=> {
    // const settingsStore = useSettingsStore()
    const lightsStore = useHalsStoreMain()
    const songsList = ref<Song[]>([])
    const selectedSongIndex = ref(-1)
    const selectedSong = computed(() => {
        if(selectedSongIndex.value !== -1)
        {
            return songsList.value[selectedSongIndex.value]
        } else {
            return false
        }
    })
    const setSelectedSong = async (index:number)=> {
        if(index >= songsList.value.length){
            selectedSongIndex.value = 0
        } else {
            selectedSongIndex.value = index
        }
    }
    const addSongs = async (songs:(Blob)[]) => {
        const startTimer = performance.now()
        try {
            for(const song of songs)
            {
                const audioContext = new AudioContext();
                let myBuffer:ArrayBuffer|null|string
                let tempo = 0
                const songURL = URL.createObjectURL(song)
                let decodedBuffer:AudioBuffer
                let cover = ''
                const id =  crypto.randomUUID();

                // const analyser = audioContext.createAnalyser()
                // analyser.fftSize = 256;
                // const metaData = await musicMetadata.parseBlob(song)
                function readAsArrayBuffer(file:Blob):Promise<ArrayBuffer|null|string> {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsArrayBuffer(file);
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                    });
                }
                myBuffer = await readAsArrayBuffer(song)

                if(myBuffer === null || typeof(myBuffer) === "string"){
                    throw new Error ('Failed to decode audio buffer')
                }
                const mp3tag = new MP3Tag(myBuffer, false).read()
                decodedBuffer = await audioContext.decodeAudioData(myBuffer)
                // const signal = new Float32Array(256)
                // const ampSpectrum = []
                // const RMSArray = []
                // const centroidArray = []
                tempo = await(analyze(decodedBuffer))

                // const tempoSample = Math.round((60/tempo)/(1/decodedBuffer.sampleRate))
                // const samplingRange =  Math.round(tempoSample/16)
                // console.log(tempoSample)
                // console.log(samplingRange)
                //     for (let i = 0; i < decodedBuffer.sampleRate * decodedBuffer.duration; i += tempoSample) {
                //         for(let j = 4; j >= 0; j--) {
                //             if(i - (samplingRange)*j >= 0){
                //                 decodedBuffer.copyFromChannel(signal, 0, i - (samplingRange)*j)
                //
                //                 ampSpectrum.push(Meyda.extract('amplitudeSpectrum', signal));
                //                 RMSArray.push(Meyda.extract('rms', signal))
                //                 centroidArray.push(Meyda.extract('spectralCentroid', signal))
                //             }
                //         }
                //         for(let u = 1; u <= 4; u++){
                //
                //             decodedBuffer.copyFromChannel(signal, 0, i + (samplingRange)*u)
                //
                //             ampSpectrum.push(Meyda.extract('amplitudeSpectrum', signal));
                //             RMSArray.push(Meyda.extract('energy', signal))
                //             centroidArray.push(Meyda.extract('spectralCentroid', signal))
                //         }
                //     }


                // console.log(ampSpectrum)
                // console.log(RMSArray)
                // console.log(centroidArray)
                // const ampSpectrumAnalyzed:{
                //     min: number[]
                //     max: number[]
                //     median: number[]
                // }[] = []
                // const RMSArrayAnalyzed:{
                //         min: number
                //         max: number
                //         median: number
                // }[] = []
                // const centroidArrayAnalyzed:{
                //     min: number
                //     max: number
                //     median: number
                // }[] = []
                // let RMSMaxValue = 0;
                //     let RMSMinValue = decodedBuffer.sampleRate;
                // let centroidMaxValue = 0;
                // let centroidMinValue = decodedBuffer.sampleRate;
                // const ampSpectrumAnalizer = (shrinkValue:number,i:number ,jShift:number = 0)=>{
                //     const spectreMedian:number[] = (new Array(255)).fill(0,0,255);
                //     const spectreMax:number[] = (new Array(255)).fill(0,0,255);
                //     const spectreMin:number[] = (new Array(255)).fill(255,0,255);
                //
                //     let RMSMax = 0;
                //     let RMSMin = decodedBuffer.sampleRate;
                //     let RMSMedian = 0;
                //
                //     let centroidMax = 0;
                //     let centroidMin = decodedBuffer.sampleRate;
                //     let centroidMedian = 0;
                //
                //     for(let j = i-jShift; j<shrinkValue + i; j++){
                //         if(j < ampSpectrum.length){
                //             ampSpectrum[j].forEach((el, index) => {
                //                 const maxInner = Math.max(el, spectreMax[index])
                //                 const minInner = Math.min(el, spectreMax[index])
                //                 spectreMax[index] = maxInner
                //                 spectreMin[index] = minInner
                //                 spectreMedian[index] = (maxInner-minInner)/2 + minInner
                //             })
                //         }
                //         if(j < RMSArray.length){
                //             RMSMax = Math.max(RMSArray[j], RMSMax)
                //
                //             if(!isNaN(RMSMax)){
                //                 RMSMaxValue = Math.max(RMSMax, RMSMaxValue)
                //             }
                //
                //             RMSMin = Math.min(RMSArray[j], RMSMin)
                //             if(!isNaN(RMSMin)){
                //                 RMSMinValue = Math.min(RMSMin, RMSMinValue)
                //             }
                //         }
                //         if(j < centroidArray.length){
                //             centroidMax = Math.max(centroidArray[j], centroidMax)
                //             if(!isNaN(centroidMax)){
                //                 centroidMaxValue = Math.max(centroidMax, centroidMaxValue)
                //             }
                //             centroidMin = Math.min(centroidArray[j], centroidMin)
                //             if(!isNaN(centroidMin)){
                //                 centroidMinValue = Math.min(centroidMin, centroidMinValue)
                //             }
                //
                //         }
                //     }
                //     RMSMedian = ((RMSMax - RMSMin)/2) + RMSMin
                //     centroidMedian = ((centroidMax - centroidMin)/2) + centroidMin
                //
                //     ampSpectrumAnalyzed.push({
                //         min: spectreMin,
                //         max: spectreMax,
                //         median: spectreMedian
                //     })
                //     RMSArrayAnalyzed.push({
                //         min: RMSMin,
                //         max: RMSMax,
                //         median: RMSMedian,
                //     })
                //     centroidArrayAnalyzed.push({
                //         min: centroidMin,
                //         max: centroidMax,
                //         median: centroidMedian,
                //     })
                // }
                // for(let i = 0; i < ampSpectrum.length; i += 9){
                //     if(i === 0) {
                //        ampSpectrumAnalizer(4, i)
                //         i -= 4
                //     } else {
                //         ampSpectrumAnalizer(8,i, 4)
                //     }
                // }
                // const red:number[] = []
                // const green:number[] = []
                // const blue:number[] = []
                // ampSpectrumAnalyzed.forEach((el, index) => {
                //     for(let i = 0; i < 85; i++){
                //         if(!isNaN(el.median[i])){
                //             red[index] = Math.max(el.median[i], red[index])
                //         }
                //     }
                //     for(let i = 85; i < 170; i++){
                //         if(!isNaN(el.median[i])){
                //             blue[index] = Math.max(el.median[i], blue[index])
                //         }
                //     }
                //     for(let i = 170; i < 256; i++){
                //         if(!isNaN(el.median[i])){
                //             green[index] = Math.max(el.median[i], green[index])
                //         }
                //     }
                //
                // })
                if(mp3tag.v2?.APIC){
                    let base64String = "";
                    const imageData = mp3tag.v2?.APIC[0];
                    imageData.data.forEach(el => {
                        base64String += String.fromCharCode(el);
                    })
                    cover = "data:" + imageData.format + ";base64," + window.btoa(base64String);
                } else {
                    cover = 'blank.jpg'
                }
                // console.log(red)
                // console.log(green)
                // console.log(blue)
                // // settingsStore.createSettings(lightsStore.lightsList, id)
                // // console.log(settingsStore.settingsList)
                // console.log(RMSMaxValue)
                // console.log(RMSMinValue)
                songsList.value.push({
                    id,
                    URL: songURL,
                    tempo,
                    metaData: mp3tag,
                    cover,
                    duration: decodedBuffer.duration,
                    sampleRate: decodedBuffer.sampleRate
                    // spectre: ampSpectrumAnalyzed,
                    // RMS: RMSArrayAnalyzed,
                    // RMSMax: RMSMaxValue,
                    // RMSMin: RMSMinValue,
                    // centroid: centroidArrayAnalyzed,
                    // centroidMax: centroidMaxValue,
                    // centroidMin: centroidMinValue,
                    // rgb: [red, green, blue]
                })
                lightsStore.lightsList.forEach((el:Light) => {
                    if (lightsStore.lightsList.length > 0) {
                        el.selectedSetting = 0
                        console.log(el)
                        el.songSettings.push({
                            song: songsList.value.length - 1,
                            settings: [defaultSettingCreator(decodedBuffer.duration, decodedBuffer.sampleRate)]
                        })
                    }
                })
                if(!!songsList.value){
                    selectedSongIndex.value = 0;
                }
            }
            const endTimer = performance.now()
            console.log(`Uploading and analyzing song took ${endTimer - startTimer}ms`)
            return `Success, ${songs.length} songs added`
        }catch (err) {
            return err
        }

    }
    return {
        songsList,
        selectedSongIndex,
        selectedSong,
        setSelectedSong,
        addSongs,
    }
})