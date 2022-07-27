import { Tensor, TensorLike } from "../class"
import { forEach } from "../traverse"
import { ensureTensor } from "../utils"

export const max = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let record = -Infinity
    forEach(internTensor.data, x => {
        record = x > record ? x : record
        return x
    })
    return record
}

export const mean = (tensor: Tensor | TensorLike) => {
    let sum = 0
    let numValues = 0
    let result = ensureTensor(tensor)
    forEach(result.data, x => {
        numValues++
        sum += x
        return x
    })
    return sum / numValues
}

export const min = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let record = Infinity
    forEach(internTensor.data, x => {
        record = x < record ? x : record
        return x
    })
    return record
}
