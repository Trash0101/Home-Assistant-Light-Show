import {useHalsStoreMain} from "#imports";

export default async function (){
    const mainStore = useHalsStoreMain()
    let res
    try{
        res = await $fetch('/api/getLightsList', {
            method: 'get',
            server: false,
            lazy: true,
        })
        mainStore.setLights(res)
        console.log(res)
        mainStore.selectedLightIndex = 0;
        return true
    } catch(err) {
        return false
    }


}