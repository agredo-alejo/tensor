import { Tensor, TensorLike } from "../class"
import { ensureTensor } from "../utils"


export const rotate90 = (matrix: Tensor | TensorLike) => {
    let internTensor = ensureTensor(matrix)
    let result: number[][] = []
    let newCol = 0, newRow = 0
    for (let i = 0; i < internTensor.shape[1]; i++) {
        result[newRow] = []
        newCol = 0
        for (let j = internTensor.shape[0] - 1; j >= 0; j--) {
            result[newRow][newCol] = internTensor.data[j][i]
            newCol++
        }
        newRow++
    }
    return new Tensor(result, [internTensor.shape[1], internTensor.shape[0]])
}

export const rotate180 = (matrix: Tensor | TensorLike) => {
    let internTensor = ensureTensor(matrix)
    let result: number[][] = []
    for (let i = 0; i < internTensor.shape[0]; i++) {
        result[i] = internTensor.data[i].slice()
        for (let j = 0, k = internTensor.shape[1] - 1; j < k; j++, k--) {
            result[i][j] = internTensor.data[i][k]
            result[i][k] = internTensor.data[i][j]
        }
    }
    for (let j = 0; j < internTensor.shape[1]; j++) {
        for (let i = 0, k = internTensor.shape[0] - 1; i < k; i++, k--) {
            result[i][j] = internTensor.data[k][j]
            result[k][j] = internTensor.data[i][j]
        }
    }
    return new Tensor(result, internTensor.shape)
}

export const rotate270 = (matrix: Tensor | TensorLike) => {
    let internTensor = ensureTensor(matrix)
    let result: number[][] = []
    let newCol, newRow = 0
    for (let i = internTensor.shape[1] - 1; i >= 0; i--) {
        result[newRow] = []
        newCol = 0
        for (let j = 0; j < internTensor.shape[0]; j++) {
            result[newRow][newCol] = internTensor.data[j][i]
            newCol++
        }
        newRow++
    }
    return new Tensor(result, [internTensor.shape[1], internTensor.shape[0]])
}