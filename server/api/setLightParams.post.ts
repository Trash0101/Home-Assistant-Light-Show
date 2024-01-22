export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event);
    const address = await useStorage().getItem('address')
    const key = await useStorage().getItem('key')
    await Promise.all(body.id.map(async (el, index:number) => {
            if(body.settings[index].mode === 'color' && body.settings[index].color.color){
                await $fetch(`${address}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${key}`,
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
                await $fetch(`${address}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${key}`,
                        accept: '*/*'
                    },
                    body: {
                        entity_id: body.id[index],
                        color_temp_kelvin: 5500,
                        flash: 'short',
                    }
                })
            } else if(body.settings[index].mode === 'darkness') {
                await $fetch(`${address}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${key}`,
                        accept: '*/*'
                    },
                    body: {
                        entity_id: body.id[index],
                        brightness: 0,
                    }
                })
            } else if(body.settings[index].mode === 'color' && body.settings[index].color.colorRange){
                await $fetch(`${address}/api/services/light/turn_on`, {
                    method: 'post',
                    headers: {
                        authorization: `Bearer ${key}`,
                        accept: '*/*'
                    },
                    body: {
                        entity_id: body.id[index],
                        brightness: body.settings[index].color.brightness,
                        hs_color: [body.settings[index].color.colorRange, 100],
                        flash: 'short',
                    }
                })
            }

    }));
})