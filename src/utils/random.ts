export const _randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}
export const _randomIntArray = (minmax: number[]) => {
    return _randomInt(minmax[0], minmax[1])
}


export const _randomRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}
export const _randomRangeArray = (minmax: number[]) => {
    return _randomRange(minmax[0], minmax[1])
}


export const _randomStdNorm = () => {
    // TODO: change from polar box-muller to ziggurat method
    let rand, rand2, radius
    do {
        rand = Math.random() * 2 - 1
        rand2 = Math.random() * 2 - 1
        radius = rand * rand + rand2 * rand2
    } while (radius >= 1 || radius == 0)
    return rand * Math.sqrt(-2 * Math.log(radius) / radius)
}
export const _randomNormal = (mean = 0, sd = 1) => {
    return sd * _randomStdNorm() + mean
}