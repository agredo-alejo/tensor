import { Tensor, TensorLike2D } from "../class"
import { ensureTensor } from "../utils"

export const mirrorHorizontally = (matrix: Tensor | TensorLike2D) => {
    let internTensor = ensureTensor(matrix)
    let result: TensorLike2D = []
    for (let i = 0; i < internTensor.shape[0]; i++) {
        result[i] = []
        for (let j = 0, k = internTensor.shape[1] - 1; j < k; j++, k--) {
            result[i][j] = internTensor.data[i][k]
            result[i][k] = internTensor.data[i][j]
        }
    }
    return new Tensor(result, internTensor.shape)
}

export const mirrorVertically = (matrix: Tensor | TensorLike2D) => {
    let internTensor = ensureTensor(matrix)
    let result: TensorLike2D = []
    for (let i = 0; i < internTensor.shape[1]; i++) {
        result[i] = []
    }
    for (let j = 0; j < internTensor.shape[1]; j++) {
        for (let i = 0, k = internTensor.shape[0] - 1; i < k; i++, k--) {
            result[i][j] = internTensor.data[k][j]
            result[k][j] = internTensor.data[i][j]
        }
    }
    return new Tensor(result, internTensor.shape)
}