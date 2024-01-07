export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event);
    console.log(body);
    await Promise.all(body.id.map(async (el, index:number) => {
        if(body.settings[index].random){
            await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
                method: 'post',
                headers: {
                    authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                    accept: '*/*'
                },
                body: {
                    entity_id: body.id[index],
                    brightness: Math.round(Math.random()*255),
                    rgb_color: [Math.round(Math.random()*255), Math.round(Math.random()*255),Math.round(Math.random()*255)],
                    transition: 0,
                }
            })
        } else {
            if(body.settings[index].mode === 'color' && body.settings[index].color.color){
                await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                        accept: '*/*'
                    },
                    body: {

                        entity_id: body.id[index],
                        brightness: body.settings[index].color.brightness,
                        rgb_color: body.settings[index].color.color,
                        flash: 'short',
                    }
                })
            } else if(body.settings[index].mode === 'flash'){
                await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                        accept: '*/*'
                    },
                    body: {
                        entity_id: body.id[index],
                        color_temp_kelvin: 5500,
                        flash: 'short',
                    }
                })
            } else if(body.settings[index].mode === 'darkness') {
                await $fetch(`${runtimeConfig.homeAssistAddress}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${runtimeConfig.homeAssistKey}`,
                        accept: '*/*'
                    },
                    body: {
                        entity_id: body.id[index],
                        brightness: 0,
                    }
                })
            }
        }
    }));
    // console.log(homeAssistRes)
})