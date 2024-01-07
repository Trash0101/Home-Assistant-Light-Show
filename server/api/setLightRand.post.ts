export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event)
    console.log(body)
    await Promise.all(body.id.map(async (el, index) => {
            await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
                method: 'post',
                headers: {
                    authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                    accept: '*/*'
                },
                body: {
                    entity_id: body.id[index],
                    brightness: Math.round(Math.random()*255),
                    rgb_color: [Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)],
                }
            })

    }))
    })