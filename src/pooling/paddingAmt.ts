export const mpPaddingAmt = (
    inputShape: number[],
    padding: boolean,
    poolSize: number[],
    stride: number[]
) => {
    
    if (!padding) return [0, 0]


    let outputShape = [
        Math.floor((inputShape[inputShape.length - 2] - poolSize[0]) / stride[0]) + 1,
        Math.floor((inputShape[inputShape.length - 1] - poolSize[1]) / stride[1]) + 1
    ]
    let inputShape2 = [
        poolSize[0] + (outputShape[0] - 1) * stride[0],
        poolSize[1] + (outputShape[1] - 1) * stride[1],
    ]
    let diference = [
        inputShape[inputShape.length - 2] - inputShape2[0],
        inputShape[inputShape.length - 1] - inputShape2[1]
    ]
    let paddingAmount = [
        diference[0] > 0 ? poolSize[0] - diference[0] : 0,
        diference[1] > 0 ? poolSize[1] - diference[1] : 0
    ]
    return paddingAmount
}