import { Tensor, TensorLike } from "../class"
import { ensureTensor } from "../utils"

export const stack = (listOfTensors: Tensor[]) => {
    let result = []
    let shape = listOfTensors[0].shape
    for (let index = 0; index < listOfTensors.length; index++) {
        for (let j = 0; j < listOfTensors[index].rank; j++) {
            if (listOfTensors[index].shape[j] !== shape[j]) {
                console.error('Tensors must have the same shape')
                return
            }
        }
        result[index] = listOfTensors[index].data
    }
    shape.unshift(listOfTensors.length)
    return new Tensor(result, shape)
}

export const unstack = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let shape = internTensor.shape.slice()
    shape.shift()
    let result = []
    for (let index = 0; index < internTensor.data.length; index++) {
        result[index] = new Tensor(internTensor.data[index], shape)
    }
    return result
}