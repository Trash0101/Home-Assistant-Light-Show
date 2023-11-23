export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event);
    await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
        method: 'post',
        headers: {
            authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
            accept: '*/*'
        },
        body: {
            entity_id: "light.e27_10w",
            brightness: 255,
            rgb_color: [Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)],
            flash: 'short',
            transition: 20,
        }
    })
    return {
        status: 200
    }
})