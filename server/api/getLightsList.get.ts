import {Light} from "~/types/types";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const homeAssistRes =  await $fetch<[]>(`${runtimeConfig.homeAssistAddress}/api/states`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
            accept: '*/*'
        }
    })
    const lightArray = homeAssistRes.filter((el:Light)=> {
        return el.entity_id.includes('light.')
    })
    return lightArray
})