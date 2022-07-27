import { fromVector } from "./from"


export const fill = (shape: number[], value: number) => {
    let size = 1
    for (let index = 0; index < shape.length; index++) {
        size *= shape[index]
    }
    let data = []
    for (let index = 0; index < size; index++) {
        data[index] = value
    }
    return fromVector(data, shape)
}

export const ones = (shape: number[]) => {
    return fill(shape, 1)
}

export const zeros = (shape: number[]) => {
    return fill(shape, 0)
}