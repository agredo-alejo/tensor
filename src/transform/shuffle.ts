export const shuffle = (array: any[]): any[] => {
    let lastIndex = array.length - 1
    while (lastIndex > 0) {
        let randomIndex = Math.floor(Math.random() * lastIndex + 1)
        let temp = array[lastIndex]
        array[lastIndex] = array[randomIndex]
        array[randomIndex] = temp

        lastIndex -= 1
    }
    return array
}
export const shuffleMatch = (array: any[], array2: any[]) => {
    let lastIndex = array.length - 1
    while (lastIndex > 0) {
        let randomIndex = Math.floor(Math.random() * lastIndex + 1)
        let temp = array[lastIndex]
        let temp2 = array2[lastIndex]
        array[lastIndex] = array[randomIndex]
        array2[lastIndex] = array2[randomIndex]
        array[randomIndex] = temp
        array2[randomIndex] = temp2

        lastIndex -= 1
    }
    return [array, array2]
}