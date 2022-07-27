import { Tensor, TensorLike, TensorLike2D, TensorLike3D } from "../class"
import { create, zeros } from "../creation"
import { padding } from "../matrix"
import { ensureTensor } from "../utils"
import { mpOutputShape, mpOutputShape3D } from "./outputShape"
import { mpPaddingAmt } from "./paddingAmt"

export const maxPooling2D = (
    input: Tensor | TensorLike2D,
    _padding: number[] | boolean,
    poolSize = [2, 2],
    stride = poolSize,
    coords?: TensorLike2D
) => {
    coords = []
    let internInput = ensureTensor(input)

    let paddAmt = _padding instanceof Array ?
        _padding :
        mpPaddingAmt(internInput.shape, _padding, poolSize, stride)


    let inputData = padding(internInput.data, paddAmt)
    let outputShape = mpOutputShape(internInput.shape, paddAmt, poolSize, stride)

    let result = zeros(outputShape)

    for (let imgRow = 0; imgRow < outputShape[0]; imgRow++) {
        for (let imgCol = 0; imgCol < outputShape[1]; imgCol++) {
            let record = -Infinity
            let tempCoords: number[] = []
            for (let kernelRow = 0; kernelRow < poolSize[0]; kernelRow++) {
                for (let kernelCol = 0; kernelCol < poolSize[1]; kernelCol++) {
                    let row = kernelRow + imgRow * stride[0],
                        col = kernelCol + imgCol * stride[1]
                    if (inputData.data[row][col] > record) {
                        record = inputData.data[row][col]
                        tempCoords = [row, col, imgRow, imgCol]
                    }
                }
            }
            coords.push(tempCoords)
            result.data[imgRow][imgCol] = record
        }
    }
    return result
}

export const maxPooling3D = (
    input: Tensor |  TensorLike3D,
    _padding: number[] | boolean,
    poolSize = [2, 2],
    stride = poolSize,
    coords: TensorLike2D = []
) => {
    coords = []
    // input tensor3d
    let internInput = ensureTensor(input)

    let paddAmt = _padding instanceof Array ?
        _padding :
        mpPaddingAmt(internInput.shape, _padding, poolSize, stride)


    let inputData: Tensor | TensorLike = []

    for (let depth = 0; depth < internInput.shape[0]; depth++) {
        inputData[depth] = padding(internInput.data[depth], paddAmt).data
    }

    inputData = create(inputData)

    let outputShape = mpOutputShape3D(internInput.shape, paddAmt, poolSize, stride)

    
    let result = zeros(outputShape)

    for (let depth = 0; depth < inputData.shape[0]; depth++) {
        
        for (let imgRow = 0; imgRow < outputShape[1]; imgRow++) {
            
            for (let imgCol = 0; imgCol < outputShape[2]; imgCol++) {
                let record = -Infinity
                let tempCoords: number[] = []
                for (let kernelRow = 0; kernelRow < poolSize[0]; kernelRow++) {
                    for (let kernelCol = 0; kernelCol < poolSize[1]; kernelCol++) {
                        let row = kernelRow + imgRow * stride[0],
                            col = kernelCol + imgCol * stride[1]
                        if (inputData.data[depth][row][col] > record) {
                            record = inputData.data[depth][row][col]
                            tempCoords = [depth, row, col, imgRow, imgCol]
                        }
                    }
                }
                coords.push(tempCoords)
                result.data[depth][imgRow][imgCol] = record
            }
        }
    }
    return result
}