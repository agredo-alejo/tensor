import { Tensor } from "../class"
import { _randomNormal, _randomRange } from "../utils"
import { fromVector } from "./from"


export const random = (shape: number[], options: any[] = []) => {
    if (shape instanceof Tensor) {
        shape = shape.shape
    }
    let min = options[0] || -1 
    let max = options[1] || 1 
    let floor = options[2]
    let size = 1
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i]
    }
    let data = []
    if (floor == undefined) {
        for (let i = 0; i < size; i++) {
            data[i] = Math.random() * (max - min) + min
        }
    } else {
        for (let i = 0; i < size; i++) {
            data[i] = Math.floor(Math.random() * (max - min) + min)
        }
    }
    return fromVector(data, shape)
}

export const randomNormal = (shape: number[], mean: number, stddev: number) => {
    let size = 1
    let result: number[] = []
    for (let index = 0; index < shape.length; index++) {
        size *= shape[index]
    }
    for (let index = 0; index < size; index++) {
        result[index] = _randomNormal(mean, stddev)
    }
    return fromVector(result, shape)
}

export const randomUniform = (shape: number[], min: number, max: number) => {
    let size = 1
    let result: number[] = []
    for (let index = 0; index < shape.length; index++) {
        size *= shape[index]
    }
    for (let index = 0; index < size; index++) {
        result[index] = _randomRange(min, max)
    }
    return fromVector(result, shape)
}