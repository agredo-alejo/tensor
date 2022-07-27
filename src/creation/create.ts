import { Tensor, TensorLike } from "../class"
import { accesLastArray } from "../traverse"
import { ensureTensor, _inferShape } from "../utils"
import { zeros } from "./fill"
import { fromVector } from "./from"


export const tensor = (data: any, shape = _inferShape(data)) => {
    if (!(data[0] instanceof Array) && shape.length > 1) {
        return fromVector(data, shape)
    }
    return new Tensor(data, shape)
}
export const create = (data: any, shape = _inferShape(data)) => {
    if (!(data[0] instanceof Array) && shape.length > 1) {
        return fromVector(data, shape)
    }
    return new Tensor(data, shape)
}

export const scalar = (number: number) => {
    return new Tensor(number, [], 0)
}

export const range = (start: number, stop: number, step = 1) => {
    let result = []
    step = Math.abs(step)
    if (start < stop) {
        while (start < stop) {
            result.push(start)
            start += step
        }
    } else {
        while (start > stop) {
            result.push(start)
            start -= step
        }
    }
    return new Tensor(result, [result.length])
}

export const identity = (shape: number[]) => {
    let result: any[] = []
    for (let i = 0; i < shape[0]; i++) {
        result[i] = []
        for (let j = 0; j < shape[1]; j++) {
            result[i][j] = i == j ? 1 : 0
        }
    }
    return new Tensor(result, shape)
}

export const oneHot = (indices: Tensor | TensorLike, depth: number) => {
    if (typeof indices == 'number') {
        let result = zeros([depth])
        if (result.data instanceof Array && result.data[indices] !== undefined) {
            result.data[indices] = 1
        }
        return result
    }
    let internTensor = ensureTensor(indices)
    let shape = internTensor.shape.slice()
    shape.push(depth)

    let result = zeros(shape)
    let indice = 0
    accesLastArray(result.data, (array) => {
        let index = internTensor.data[indice]
        if (array[index] !== undefined) {
            array[index] = 1
        }
        indice++
    })
    return result
}