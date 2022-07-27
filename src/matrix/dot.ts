import { Tensor, TensorLike2D } from "../class"


export const dotMxM = (tensor: Tensor, tensor2: Tensor) => {
    if (tensor.shape[1] !== tensor2.shape[0]) throw console.error('Colums of A must match rows of B')

    let result: TensorLike2D = []
    for (let i = 0; i < tensor.shape[0]; i++) {
        result[i] = []
        for (let j = 0; j < tensor2.shape[1]; j++) {
            let sum = 0
            for (let k = 0; k < tensor.shape[1]; k++) {
                sum += tensor.data[i][k] * tensor2.data[k][j]
            }
            result[i][j] = sum
        }
    }
    return new Tensor(result, [tensor.shape[0], tensor2.shape[1]])
}

export const dotMxV = (tensor: Tensor, tensor2: Tensor) => {
    if (tensor.shape[1] !== tensor2.shape[0]) throw console.error('Colums of A must match rows of B')

    let result: number[] = []
    for (let i = 0; i < tensor.shape[0]; i++) {
        let sum = 0
        for (let k = 0; k < tensor.shape[1]; k++) {
            sum += tensor.data[i][k] * tensor2.data[k]
        }
        result[i] = sum
    }
    return new Tensor(result, [tensor.shape[0]])
}

export const dotVxM = (tensor: Tensor, tensor2: Tensor) => {
    if (tensor2.shape[0] !== 1) throw console.error('Colums of A must match rows of B')

    let result: TensorLike2D = []
    for (let i = 0; i < tensor.shape[0]; i++) {
        result[i] = []
        for (let j = 0; j < tensor2.shape[1]; j++) {
            result[i][j] = tensor.data[i] * tensor2.data[0][j]
        }
    }
    return new Tensor(result, [tensor.shape[0], tensor2.shape[1]])
}

export const dotVxV = (tensor: Tensor, tensor2: Tensor) => {
    if (tensor.shape[0] !== tensor2.shape[0]) throw console.error('Colums of A must match rows of B')
    
    let sum = 0
    for (let k = 0; k < tensor.shape[0]; k++) {
        sum += tensor.data[k] * tensor2.data[k]
    }
    return new Tensor(sum, [])
}

export const dot = (tensor: Tensor, tensor2: Tensor) => {
    if (tensor.rank == 2) {
        if (tensor2.rank == 2) {
            return dotMxM(tensor, tensor2)
        }
        return dotMxV(tensor, tensor2)
    }
    if (tensor2.rank == 2) {
        return dotVxM(tensor, tensor2)
    }
    return dotVxV(tensor, tensor2)
}
