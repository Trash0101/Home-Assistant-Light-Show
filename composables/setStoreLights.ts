import {useHalsStoreMain} from "#imports";

export default async function (){
    const mainStore = useHalsStoreMain()
    const res = await $fetch('/api/getLightsList', {
        method: 'get',
        server: false,
        lazy: true,
    })
    mainStore.setLights(res)
}