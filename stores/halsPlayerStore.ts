import {defineStore} from "pinia";
import type {Song} from "~/types/types";
import {analyze} from "web-audio-beat-detector";
import MP3Tag from "mp3tag.js";
import {setStoreLights} from "#build/imports";

export const usePlayerStore = defineStore('player', ()=> {
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
        await setStoreLights()
        selectedSongIndex.value = index
    }
    const selectedSongCover = ref<string>()
    const setSelectedSongCover = (cover:string) => {
        selectedSongCover.value = cover
    }
    const addSongs = async (songs:(Blob)[]) => {
        try {
        for(const song of songs)
        {
            const audioContext = new AudioContext();
            let myBuffer:ArrayBuffer|null|string
            let tempo = 0
            const songURL = URL.createObjectURL(song)
            let decodedBuffer:AudioBuffer
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
            const audioSource = audioContext.createBufferSource()
            decodedBuffer = await audioContext.decodeAudioData(myBuffer)
            tempo = await(analyze(decodedBuffer))
            songsList.value.push({
                id: crypto.randomUUID(),
                URL: songURL,
                buffer: decodedBuffer,
                tempo,
                metaData: mp3tag,
            })

        }
            selectedSongIndex.value = 0;
            return `Success, ${songs.length} songs added`
        } catch (err) {
            return err
        }
    }
    return {
        songsList,
        selectedSongIndex,
        selectedSong,
        setSelectedSong,
        addSongs,
        selectedSongCover,
        setSelectedSongCover
    }
})