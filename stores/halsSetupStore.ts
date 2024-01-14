export const useHalsSetupStore = defineStore('setup', () => {
    const key = ref('')
    const address = ref('')
    const setAddress = (add:string) => {
        const regex = /^.*\..*$|^.*\:.*$/;
        const trimmed = add.trim()
        if(regex.test(trimmed)) {
            if(!add.includes('http://') && !trimmed.includes('https://') ) {
                address.value = 'http://'+trimmed
                return true
            } else {
                address.value = trimmed
                return true
            }
        } else {
            console.log('false', trimmed)
            return false
        }
    }
    const setKey = (providedKey:string) => {
        const trimmed = providedKey.trim()
        if(trimmed === '') {
            return false
        } else {
            key.value = trimmed
            return true
        }
    }
    const purgeValues = () => {
        key.value = ''
        address.value = ''
    }
    return {
        key,
        address,
        setAddress,
        setKey,
        purgeValues,
    }
})