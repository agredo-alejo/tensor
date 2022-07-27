export const cc_outputShape = (
    inputShape: number[],
    filterShape: number[],
    paddingAmount: number[],
    stride: number[],
    dilation: number[]
) => {
    let outputShape = [
        (inputShape[0] + paddingAmount[0] - dilation[0] * (filterShape[0] - 1) - 1) / stride[0] + 1,
        (inputShape[1] + paddingAmount[1] - dilation[1] * (filterShape[1] - 1) - 1) / stride[1] + 1,
    ]
    outputShape = [Math.floor(outputShape[0]), Math.floor(outputShape[1])]
    return outputShape
}

export const cc_3dOutputShape = (
    inputShape: number[],
    filterShape: number[],
    paddingAmount: number[],
    stride: number[],
    dilation: number[]) => {

    let outputShape = [
        inputShape[0],
        (inputShape[1] + paddingAmount[0] - dilation[0] * (filterShape[1] - 1) - 1) / stride[0] + 1,
        (inputShape[2] + paddingAmount[1] - dilation[1] * (filterShape[2] - 1) - 1) / stride[1] + 1,
    ]
    outputShape = [Math.floor(outputShape[0]), Math.floor(outputShape[1]), Math.floor(outputShape[2])]
    return outputShape
}

export const manyFiltersOutputShape = (
    inputShape: number[],
    filterShape: number[],
    paddingAmount: number[],
    stride: number[],
    dilation: number[]
) => {
    let outputShape = [
        filterShape[0],
        (inputShape[1] + paddingAmount[0] - dilation[0] * (filterShape[2] - 1) - 1) / stride[0] + 1,
        (inputShape[2] + paddingAmount[1] - dilation[1] * (filterShape[3] - 1) - 1) / stride[1] + 1,
    ]
    outputShape = [Math.floor(outputShape[0]), Math.floor(outputShape[1]), Math.floor(outputShape[2])]
    return outputShape
}

export const cc_reuseFilterOutputShape = (
    inputShape: number[],
    filterShape: number[],
    paddingAmount: number[],
    stride: number[],
    dilation: number[]
) => {
    let outputShape = [
        inputShape[0],
        (inputShape[1] + paddingAmount[0] - dilation[0] * (filterShape[0] - 1) - 1) / stride[0] + 1,
        (inputShape[2] + paddingAmount[1] - dilation[1] * (filterShape[1] - 1) - 1) / stride[1] + 1,
    ]

    outputShape = [Math.floor(outputShape[0]), Math.floor(outputShape[1]), Math.floor(outputShape[2])]
    return outputShape
}