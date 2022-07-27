import { Tensor, TensorLike } from "../class"
import { forEach } from "../traverse"
import { ensureTensor, _constrain } from "../utils"

export const sum = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let result = 0
    forEach(internTensor.data, x => {
        result += x
        return x
    })
    return result
}

export const sumExp = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let result = 0
    forEach(internTensor.data, x => {
        result += Math.exp(_constrain(x, -50, 50))
        return x
    })
    return result
}