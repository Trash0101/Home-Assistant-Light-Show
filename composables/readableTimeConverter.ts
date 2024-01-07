export default (timeInSeconds:number) => {
        const minutes = Math.floor(timeInSeconds/60) < 10 ? `0${Math.floor(timeInSeconds/60)}` : Math.floor(timeInSeconds/60)
        const seconds = (timeInSeconds%60 < 10 ? `0${timeInSeconds%60}` : timeInSeconds%60)
        if(timeInSeconds/60 < 60) {
            return `${minutes}:${seconds}`
        } else {
            const hours = Math.floor(timeInSeconds/60)/60 < 10 ? `0${Math.floor(timeInSeconds/60)/60}` : Math.floor((timeInSeconds/60)/60)
            return `${hours}:${minutes}:${seconds}`
        }
}