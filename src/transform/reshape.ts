import { Tensor, TensorLike, TensorLike1D } from "../class"
import { fromArray } from "../creation"
import { forEach } from "../traverse"
import { ensureTensor } from "../utils"


export const flatten = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let vector: number[] = []
    forEach(internTensor.data, (x: number) => {
        vector.push(x)
        return x
    })
    return new Tensor(vector, [vector.length])
}

export const reshape = (tensor: Tensor | TensorLike, shape: number[]) => {
    return vectorToTensor(flatten(tensor), shape)
}

export const vectorToTensor = (tensor: Tensor | TensorLike1D, shape: number[]) => {
    let size = 1
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i]
    }
    let internTensor = ensureTensor(tensor)
    if (size == internTensor.data.length) {
        let tensor = internTensor.data
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

    } else {
        throw console.error('Based on the provided shape the tensor should have ' + size + ' values but has ' + internTensor.data.length)
    }
}

export const tile = (tensor: Tensor | TensorLike, reps: number[]) => {
    let internTensor = ensureTensor(tensor)
    if (reps.length !== internTensor.rank) {
        throw console.error('Dimentions in reps ' + reps + ' does not match with the number of dimentions from tensor ' + internTensor.shape)
    }
    let newShape: number[] = []
    for (let i = 0; i < internTensor.rank; i++) {
        newShape[i] = reps[i] * internTensor.shape[i]
    }
    let newData: any[] = []
    let recursion = (array: any[], array2: any[], currentDimention: number) => {
        if (array[0] instanceof Array) {
            for (let i = 0; i < newShape[currentDimention]; i++) {
                array2[i] = []
                recursion(array[i % internTensor.shape[currentDimention]], array2[i], currentDimention + 1)
            }
        }
        else {
            for (let i = 0; i < newShape[newShape.length - 1]; i++) {
                array2[i] = array[i % internTensor.shape[internTensor.rank - 1]]
            }
        }
    }
    recursion(internTensor.data, newData, 0)
    return fromArray(newData, newShape)
}