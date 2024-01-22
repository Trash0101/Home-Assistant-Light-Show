export default defineEventHandler(async (event) => {
await useStorage().setItem('address', '')
await useStorage().setItem('key', '')
})