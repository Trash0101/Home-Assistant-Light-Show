export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const homeAssistRes =  await $fetch<[]>(`${runtimeConfig.homeAssistAddress}/api/states`, {
        method: 'get',
        headers: {
            authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
            accept: '*/*'
        }
    })
    const lightArray = homeAssistRes.filter((el)=> {
        return el.entity_id.includes('light.')
    })
    console.log(lightArray)
    return lightArray
})