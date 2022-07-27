import { Tensor, TensorLike } from "../class"
import { ensureTensor } from "../utils"
import { reshape, tile } from "./reshape"


export const broadcastArgs = (shape: number[], shape2: number[]) => {
    let oldShape = shape.slice(), oldShape2 = shape2.slice()
    if (oldShape.length > oldShape2.length) {
        while (oldShape2.length < oldShape.length) {
            oldShape2.unshift(1)
        }
    } else {
        while (oldShape.length < oldShape2.length) {
            oldShape.unshift(1)
        }
    }
    let resultShape = []
    for (let index = 0; index < oldShape.length; index++) {
        resultShape[index] = Math.max(oldShape[index], oldShape2[index])
    }
    return resultShape
}

export const broadcastTo = (tensor: Tensor | TensorLike, shape: number[]) => {
    let internTensor = ensureTensor(tensor)
    let oldShape = internTensor.shape.slice()
    if (shape.length < internTensor.rank) {
        throw console.error('Rank from shape ' + shape.length + ' is minor than tensor rank ' + internTensor.rank)
    }
    let result = internTensor
    if (shape.length > internTensor.rank) {
        let newShape = oldShape.slice();
        while (newShape.length < shape.length) {
            newShape.unshift(1)
        }
        result = reshape(internTensor, newShape)
    }
    let reps = shape.slice()
    for (let index = 0; index < shape.length; index++) {
        if (result.shape[index] === shape[index]) {
            reps[index] = 1;
        } else if (result.shape[index] !== 1) {
            throw console.error(oldShape + ' cannot be broadcast to ' + shape)
        }
    }
    return tile(result, reps)
}