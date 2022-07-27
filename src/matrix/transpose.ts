import { Tensor, TensorLike } from "../class"
import { ensureTensor } from "../utils"

export const transpose = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    if (internTensor.rank == 2) {
        let result: any[] = []
        for (let i = 0; i < internTensor.shape[1]; i++) {
            result[i] = []
            for (let j = 0; j < internTensor.shape[0]; j++) {
                result[i][j] = internTensor.data[j][i]
            }
        }
        return new Tensor(result, [internTensor.shape[1], internTensor.shape[0]])
    } else {
        let result: any[] = [[]]
        for (let i = 0; i < internTensor.shape[0]; i++) {
            result[0][i] = internTensor.data[i]
        }
        return new Tensor(result, [1, internTensor.shape[0]])
    }
}