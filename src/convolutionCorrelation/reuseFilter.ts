import { Tensor, TensorLike2D, TensorLike3D } from "../class"
import { zeros } from "../creation"
import { padding, rotate180 } from "../matrix"
import { ensureTensor, _inferShape } from "../utils"
import { cc_reuseFilterOutputShape } from "./outputShape"
import { cc_paddingAmt } from "./paddingAmt"


export const correlationReuseFilter = (
    input: Tensor | TensorLike3D,
    filter: Tensor | TensorLike2D,
    _padding: number[] | string = [0, 0],
    stride = [1, 1],
    dilation = [1, 1]
) => {
    let internInput = ensureTensor(input)
    let internFilter = ensureTensor(filter)

    let paddAmt = _padding instanceof Array ? _padding :
        cc_paddingAmt(
            internInput.shape,
            internFilter.shape,
            _padding, stride, dilation
        )

    let outputShape = cc_reuseFilterOutputShape(internInput.shape, internFilter.shape, paddAmt, stride, dilation)
    let inputData: TensorLike3D = []
    for (let index = 0; index < internInput.shape[0]; index++) {
        inputData[index] = padding(internInput.data[index], paddAmt).data
    }


    let internData = new Tensor(inputData, _inferShape(inputData))
    let result = zeros(outputShape)
    for (let depth = 0; depth < internData.shape[0]; depth++) {

        for (let imgRow = 0; imgRow < outputShape[1]; imgRow++) {
            for (let imgCol = 0; imgCol < outputShape[2]; imgCol++) {
                let sum = 0
                for (let kernelRow = 0; kernelRow < internFilter.shape[2]; kernelRow++) {
                    for (let kernelCol = 0; kernelCol < internFilter.shape[3]; kernelCol++) {
                        let row = kernelRow * dilation[0] + imgRow * stride[0]
                        let col = kernelCol * dilation[1] + imgCol * stride[1]

                        sum += internData.data[depth][row][col] * internFilter.data[kernelRow][kernelCol]
                    }
                }
                result.data[depth][imgRow][imgCol] += sum
            }
        }
    }
    return result
}

export const convolutionReuseFilter = (
    input: Tensor | TensorLike3D,
    filter: Tensor | TensorLike2D,
    _padding: number[] | string = [0, 0],
    stride = [1, 1],
    dilation = [1, 1]
) => {
    let internFilter = ensureTensor(filter)
    let rotatedFilter = rotate180(internFilter)
    return correlationReuseFilter(input, rotatedFilter, _padding, stride, dilation)
}
