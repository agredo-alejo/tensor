export const samePaddingAmt = (
    inputShape: number[],
    filterShape: number[],
    stride?: number[],
    dilation = [1, 1]
) => {
    stride = stride || dilation 

    let inputImgSize = [
        inputShape[inputShape.length - 2],
        inputShape[inputShape.length - 1]
    ]

    let filterSize = [
        filterShape[filterShape.length - 2],
        filterShape[filterShape.length - 1]
    ]
    

    let padHeight = Math.floor(
        dilation[0] * (filterSize[0] - 1) + (inputImgSize[0] - 1) * (stride[0] - 1)
    )
    let padWidth = Math.floor(
        dilation[1] * (filterSize[1] - 1) + (inputImgSize[1] - 1) * (stride[1] - 1)
    )
    return [padHeight, padWidth]
}


export const fullPaddingAmt = (
    filterShape: number[],
) => {

    let filterSize = [
        filterShape[filterShape.length - 2],
        filterShape[filterShape.length - 1]
    ]

    return [
        (filterSize[0] - 1) * 2,
        (filterSize[1] - 1) * 2
    ]
}


export const cc_paddingAmt = (
    inputShape: number[],
    filterShape: number[],
    padding: string,
    stride?: number[],
    dilation = [1, 1]
) => {
    if(padding === "same") return samePaddingAmt(inputShape, filterShape, stride, dilation)

    if(padding === "full") return fullPaddingAmt(filterShape)

    return [0, 0]
}