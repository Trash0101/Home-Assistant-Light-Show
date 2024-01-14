
export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event)
    const body = await readBody(event)
    let response
    let error
    try{
        response = await $fetch(`${body.address}/`)
        if(typeof(response) === 'string'){
            if(response.includes("Home Assistant")) {
                response = "success"
            } else {
                response = "error"
            }
        }else {
            response = "error"
        }
    } catch(err) {
        response = "error"
    }
    process.env.addressTest = '1'
    console.log(process.env.addressTest, 'ADDRESS')
    await useStorage().setItem('address', 'test')
    if(response === "success") {
        await useStorage().setItem('address', body.address)
    }
    return {
        res: response,
    }
})