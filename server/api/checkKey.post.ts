
export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event)
    const address = await useStorage().getItem('address')
    let res
    try {
        res = await $fetch(`${address}/api/`, {
            method: 'get',
            headers: {
                authorization: `Bearer ${body.key}`,
                accept: '*/*'
            }
        })
        if(res?.message === 'API running.') {
            await useStorage().setItem('key', body.key)
            res = "success"
        } else {
            res = "error"
        }
    } catch(err) {
        res = "error"
    }
    console.log(res);
    return {
        res
    }
})