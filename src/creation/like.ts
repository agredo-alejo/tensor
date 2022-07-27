import { Tensor, TensorLike } from "../class"
import { ensureTensor } from "../utils"
import { fill } from "./fill"


export const fillLike = (tensor: Tensor | TensorLike, number: number) => {
    let internTensor = ensureTensor(tensor)

    return fill(internTensor.shape, number)
}

export const onesLike = (tensor: Tensor | TensorLike) => {

    return fillLike(tensor, 1)
}

export const zerosLike = (tensor: Tensor | TensorLike) => {

    return fillLike(tensor, 0)
}
