import { Tensor, TensorLike, TensorObject } from "../class"
import { _inferShape } from "../utils"

export const fromArray = (array: TensorLike, shape?: number[]) => {
    shape = shape || _inferShape(array)
    return new Tensor(array, shape)
}

export const fromObject = (tensor: Tensor | TensorObject) => {
    return new Tensor(tensor.data, tensor.shape)
}

export const fromVector = (array: number[], shape = [array.length]) => {
    let size = 1
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i]
    }
    if (size !== array.length) throw console.error('Based on the provided shape the tensor should have ' + size + ' values but has ' + array.length)

    let tensor: TensorLike = array
    for (let dimentionNumber = shape.length - 1; dimentionNumber >= 0; dimentionNumber--) {
        let dimentionData: any[] = []
        let element = 0
        for (let dimentionShape = 0; dimentionShape < tensor.length / shape[dimentionNumber]; dimentionShape++) {
            dimentionData[dimentionShape] = []
            for (let length = 0; length < shape[dimentionNumber]; length++) {
                dimentionData[dimentionShape][length] = tensor[element]
                element++
            }
        }
        tensor = dimentionData
    }
    tensor = tensor[0]
    return new Tensor(tensor, shape)
}
