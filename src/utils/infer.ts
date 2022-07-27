import { TensorLike } from "../class"


export const _inferRank = (array: TensorLike) => {
    let rank = 0
    let checkingArray = array
    while (checkingArray instanceof Array) {
        rank += 1
        checkingArray = checkingArray[0]
    }
    return rank
}

export const _inferShape = (array: TensorLike) => {
    let inferredShape = []
    let checkingArray = array
    while (checkingArray instanceof Array) {
        inferredShape.push(checkingArray.length)
        checkingArray = checkingArray[0]
    }
    return inferredShape
}
