import {Light} from "~/types/types";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const address = await useStorage().getItem('address')
    const key = await useStorage().getItem('key')
    const homeAssistRes =  await $fetch<[]>(`${address}/api/states`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${key}`,
            accept: '*/*'
        }
    })
    const lightArray = homeAssistRes.filter((el:Light)=> {
        return el.entity_id.includes('light.')
    })
    return lightArray
})