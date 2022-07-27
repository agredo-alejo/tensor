export const mpOutputShape = (
    inputShape: number[],
    paddingAmount: number[],
    poolSize: number[],
    stride: number[]
) => {
    let outputShape = [
        Math.floor(((inputShape[0] + paddingAmount[0]) - poolSize[0]) / stride[0] + 1),
        Math.floor(((inputShape[1] + paddingAmount[1]) - poolSize[1]) / stride[1] + 1),
    ]
    return outputShape
}

export const mpOutputShape3D = (
    inputShape: number[],
    paddingAmount: number[],
    poolSize: number[],
    stride: number[]
) => {
    let outputShape = [
        inputShape[0],
        Math.floor(((inputShape[1] + paddingAmount[0]) - poolSize[0]) / stride[0] + 1),
        Math.floor(((inputShape[2] + paddingAmount[1]) - poolSize[1]) / stride[1] + 1),
    ]
    return outputShape
}