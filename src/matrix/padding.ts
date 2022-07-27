import { Tensor, TensorLike2D } from "../class"
import { ensureTensor } from "../utils"


export const padding = (input: Tensor | TensorLike2D, paddAmt: number[]) => {
    let internInput = ensureTensor(input)
    if (paddAmt[0] == 0 && paddAmt[1] == 0) return internInput

    let padHeight = paddAmt[0], padWidth = paddAmt[1]
    let topPad = Math.floor(paddAmt[0] / 2)
    let bottomPad = paddAmt[0] - topPad

    let leftPad = Math.floor(paddAmt[1] / 2)
    let rightPad = paddAmt[1] - leftPad


    let result: TensorLike2D = []

    for (let i = 0; i < internInput.shape[1]; i++) {
        result[i] = internInput.data[i].slice()
        for (let j = 0; j < leftPad; j++) {
            result[i].unshift(0)
        }
        for (let j = 0; j < rightPad; j++) {
            result[i].push(0)
        }
    }
    for (let i = 0; i < topPad; i++) {
        result.unshift(new Array(result[0].length).fill(0))
    }
    for (let i = 0; i < bottomPad; i++) {
        result.push(new Array(result[0].length).fill(0))
    }
    return new Tensor(result, [internInput.shape[0] + padHeight, internInput.shape[1] + padWidth])
}