export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event)
    if(body.toggler) {
        await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
            method: 'post',
            headers: {
                authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                accept: '*/*'
            },
            body: {
                entity_id: ["light.e27_10w", "light.e14_5w"],
                brightness: Math.floor(Math.random() * 100),
                rgb_color: [Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255)],
                transition: 0,
            }
        })
    } else {
        await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_off`, {
            method: 'post',
            headers: {
                authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                accept: '*/*'
            },
            body: {
                entity_id: ["light.e27_10w", "light.e14_5w"],
            }
        })
    }


    return {
        status: 200
    }
})