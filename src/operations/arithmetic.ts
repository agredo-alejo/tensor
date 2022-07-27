import { Tensor, TensorLike } from "../class"
import { broadcastArgs, broadcastTo } from "../transform"
import { forEachOfBothReturn } from "../traverse"
import { ensureTensor, shapesEqual } from "../utils"



export const arithOp = (fn: (num: number, num2: number) => number) => {

    return (tensor: Tensor | TensorLike, tensor2: Tensor | TensorLike) => {

        let internTensor = ensureTensor(tensor)
        let internTensor2 = ensureTensor(tensor2)


        let newShape = internTensor.shape
        if (!shapesEqual(internTensor.shape, internTensor2.shape)) {
            newShape = broadcastArgs(internTensor.shape, internTensor2.shape)
            internTensor = broadcastTo(internTensor, newShape)
            internTensor2 = broadcastTo(internTensor2, newShape)
        }
        return new Tensor(forEachOfBothReturn(internTensor.data, internTensor2.data, (x, y) => fn(x, y)), newShape)

    }
}

export const add = arithOp((x, y) => x + y)
export const sub = arithOp((x, y) => x - y)
export const mult = arithOp((x, y) => x * y)
export const div = arithOp((x, y) => x / y)
export const divNoNan = arithOp((x, y) => y == 0 ? 0 : x / y)
export const floorDiv = arithOp((x, y) => Math.floor(x / y))
export const floorDivNoNan = arithOp((x, y) => Math.floor(y == 0 ? 0 : x / y))
export const pow = arithOp((x, y) => x ** y)
export const sqd = arithOp((x, y) => (x - y) * (x - y))
export const atan2 = arithOp((x, y) => Math.atan2(x, y))
