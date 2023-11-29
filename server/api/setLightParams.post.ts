export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event);
    const homeAssistRes = await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
        method: 'post',
        headers: {
            authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
            accept: '*/*'
        },
        body: {
            entity_id: body.entity_id,
            brightness: body.brightness,
            rgb_color: body.rgb_color,
            flash: 'short',
        }
    })
    console.log(homeAssistRes)
    return homeAssistRes
})