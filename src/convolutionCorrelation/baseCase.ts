import { Tensor, TensorLike, TensorLike2D, TensorLike3D } from "../class"
import { zeros } from "../creation"
import { padding, rotate180 } from "../matrix"
import { ensureTensor, _inferShape } from "../utils"
import { cc_3dOutputShape, cc_outputShape } from "./outputShape"
import { cc_paddingAmt } from "./paddingAmt"


export const correlate2D = (
    input: Tensor | TensorLike2D,
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


    let outputShape = cc_outputShape(internInput.shape, internFilter.shape, paddAmt, stride, dilation)
    let inputData = padding(internInput, paddAmt)
    let result: TensorLike2D = []
    for (let imgRow = 0; imgRow < outputShape[0]; imgRow++) {
        result[imgRow] = []
        for (let imgCol = 0; imgCol < outputShape[1]; imgCol++) {
            let sum = 0
            for (let kernelRow = 0; kernelRow < internFilter.shape[0]; kernelRow++) {
                for (let kernelCol = 0; kernelCol < internFilter.shape[1]; kernelCol++) {
                    let row = kernelRow * dilation[0] + imgRow * stride[0]
                    let col = kernelCol * dilation[1] + imgCol * stride[1]

                    sum += inputData.data[row][col] * internFilter.data[kernelRow][kernelCol]
                }
            }
            result[imgRow][imgCol] = sum
        }
    }
    return new Tensor(result, outputShape)
}
export const convolution2D = (
    input: Tensor | TensorLike2D,
    filter: Tensor | TensorLike2D,
    _padding: number[] | string = [0, 0],
    stride = [1, 1],
    dilation = [1, 1]) => {

    let rotatedFilters = rotate180(filter)

    return correlate2D(input, rotatedFilters, _padding, stride, dilation)
}




export const correlate3D = (
    input: Tensor | TensorLike3D,
    filter: Tensor | TensorLike3D,
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



    let outputShape = cc_3dOutputShape(internInput.shape, internFilter.shape, paddAmt, stride, dilation)

    let inputData: TensorLike3D | Tensor = []
    for (let index = 0; index < internInput.shape[0]; index++) {
        inputData[index] = padding(internInput.data[index], paddAmt).data
    }


    return correlate3Dcore(inputData, internFilter, outputShape, dilation, stride)
}

export const convolution3D = (
    input: Tensor | TensorLike3D,
    filter: Tensor | TensorLike3D,
    _padding: number[] | string = [0, 0],
    stride = [1, 1],
    dilation = [1, 1]
) => {
    let internFilter = ensureTensor(filter)
    let internInput = ensureTensor(input)

    let paddAmt = _padding instanceof Array ? _padding :
        cc_paddingAmt(
            internInput.shape,
            internFilter.shape,
            _padding, stride, dilation
        )


    let outputShape = cc_3dOutputShape(internInput.shape, internFilter.shape, paddAmt, stride, dilation)


    let inputData: TensorLike3D = []
    let rotatedFilters: TensorLike3D = []
    for (let i = 0; i < internFilter.shape[0]; i++) {
        inputData[i] = padding(internInput.data[i], paddAmt).data
        rotatedFilters[i] = rotate180(internFilter.data[i]).data
    }

    return correlate3Dcore(inputData, internFilter, outputShape, dilation, stride)
}


export const correlate3Dcore = (
    inputData: TensorLike,
    internFilter: Tensor,
    outputShape: number[],
    dilation: number[],
    stride: number[]
) => {

    let internData = new Tensor(inputData, _inferShape(inputData))
    let result = zeros(outputShape)
    for (let depth = 0; depth < internData.shape[0]; depth++) {

        for (let imgRow = 0; imgRow < outputShape[1]; imgRow++) {
            for (let imgCol = 0; imgCol < outputShape[2]; imgCol++) {
                let sum = 0
                for (let kernelRow = 0; kernelRow < internFilter.shape[1]; kernelRow++) {
                    for (let kernelCol = 0; kernelCol < internFilter.shape[2]; kernelCol++) {
                        let row = kernelRow * dilation[0] + imgRow * stride[0]
                        let col = kernelCol * dilation[1] + imgCol * stride[1]

                        sum += internData.data[depth][row][col] * internFilter.data[depth][kernelRow][kernelCol]
                    }
                }

                result.data[depth][imgRow][imgCol] += sum
            }
        }
    }
    return result
}