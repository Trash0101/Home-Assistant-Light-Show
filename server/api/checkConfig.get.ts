export default defineEventHandler(async (event) => {
    const address = await useStorage().getItem('address')
    const key = await useStorage().getItem('key')
    return {
        result: !!address && !!key
    }
})