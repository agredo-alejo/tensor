import { Tensor, TensorLike } from "../class"
import { _inferShape } from "./infer"


export const ensureTensor = (tensor: Tensor | TensorLike) => {
    if (tensor instanceof Tensor) {
        return tensor
    }
    return new Tensor(tensor, _inferShape(tensor))
}


export const copy = (tensor: Tensor | TensorLike) => {
    let recursion = (copy: any[], array: any) => {
        if (array[0] instanceof Array) {
            for (let i = 0; i < array.length; i++) {
                copy[i] = []
                recursion(copy[i], array[i])
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                copy[i] = array[i]
            }
        }
    }
    let internTensor = ensureTensor(tensor)
    if (internTensor.data instanceof Array) {
        let newTensor: any[] = []
        recursion(newTensor, internTensor.data)
        return new Tensor(newTensor, internTensor.shape)
    } else {
        return new Tensor(internTensor.data, internTensor.shape)
    }
}

export const shapesEqual = (shape: number[], shape2: number[]) => {
    if (shape.length !== shape2.length) return false

    for (let i = 0; i < shape.length; i++) {
        if (shape[i] !== shape2[i]) return false
    }
    return true
}

export const size = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let size = 1
    for (let i = 0; i < internTensor.shape.length; i++) {
        size *= internTensor.shape[i]
    }
    return size
}

export const serialize = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    return JSON.stringify(internTensor)
}

export const deserialize = (object: string) => {
    let deserialized: Tensor = JSON.parse(object)
    return new Tensor(deserialized.data, deserialized.shape, deserialized.rank)
}