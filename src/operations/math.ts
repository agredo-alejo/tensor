import { Tensor, TensorLike, TensorLike2D } from "../class"
import { tensor, zerosLike } from "../creation"
import { max, mean, min, sumExp } from "../reduction"
import { forEachReturn } from "../traverse"
import { ensureTensor, _constrain, _remap } from "../utils"
import { div, sub } from "./arithmetic"


export const mathOP = (fn: (x: number) => number) => {
    return (tensor: Tensor | TensorLike) => {
        let internTensor = ensureTensor(tensor)
        let result = forEachReturn(internTensor.data, x => fn(x))
        return new Tensor(result, internTensor.shape)
    }
}
export const neg = mathOP(x => -x)
export const abs = mathOP(x => Math.abs(x))
export const acos = mathOP(x => Math.acos(x))
export const acosh = mathOP(x => Math.acosh(x))
export const asin = mathOP(x => Math.asin(x))
export const asinh = mathOP(x => Math.asinh(x))
export const atan = mathOP(x => Math.atan(x))
export const cbrt = mathOP(x => Math.cbrt(x))
export const ceil = mathOP(x => Math.ceil(x))
export const cos = mathOP(x => Math.cos(x))
export const cosh = mathOP(x => Math.cosh(x))
export const exp = mathOP(x => Math.exp(x))
export const expm1 = mathOP(x => Math.expm1(x))
export const floor = mathOP(x => Math.floor(x))
export const log = mathOP(x => Math.log(x))
export const log10 = mathOP(x => Math.log10(x))
export const log2 = mathOP(x => Math.log2(x))
export const round = mathOP(x => Math.round(x))
export const sign = mathOP(x => Math.sign(x))
export const sin = mathOP(x => Math.sin(x))
export const sinh = mathOP(x => Math.sinh(x))
export const sqrt = mathOP(x => Math.sqrt(x))
export const square = mathOP(x => x * x)
export const tan = mathOP(x => Math.tan(x))
export const trunc = mathOP(x => Math.trunc(x))

export const tanh = mathOP(x => Math.tanh(x))
export const tanh_prime = mathOP(x => 1 - x ** 2)

export const sigmoid = mathOP(x => 1 / (1 + Math.exp(-x)))
export const sigmoid_prime = mathOP(x => x * (1 - x))

export const relu = mathOP(x => Math.max(0, x))
export const relu_prime = mathOP(x => x > 0 ? 1 : 0)

export const leakyRelu = mathOP(x => Math.max(0.05 * x, x))
export const leakyRelu_prime = mathOP(x => x > 0 ? 1 : 0.05)

export const elu = mathOP(x => x > 0 ? x : 0.05 * (Math.exp(x) - 1))
export const elu_prime = mathOP(x => x > 0 ? 1 : 0.05 + x)

export const softplus = mathOP(x => Math.log(1 + Math.exp(x)))
export const softplus_prime = mathOP(x => 1 / (1 + Math.exp(-x)))

export const binaryStep = mathOP(x => x > 0 ? 1 : 0)
export const binaryStep_prime = (tensor: Tensor | TensorLike)=>{
    return zerosLike(tensor)
}

export const step = (tensor: Tensor | TensorLike, alpha = 0) => {

    return mathOP(
        x => x > 0 ? 1 : alpha * x
    )(tensor)
}

export const remap = (tensor: Tensor | TensorLike, start1: number, end1: number, start2: number, end2: number) => {

    return mathOP(
        x => _remap(x, start1, end1, start2, end2)
    )(tensor)
}
/**
 * 
 * @param args [0] start1
 * @param args [1] end1
 * @param args [2] start2
 * @param args [3] end2
 */
export const remapArray = (tensor: Tensor | TensorLike, args: number[]) => {

    return mathOP(
        x => _remap(x, args[0], args[1], args[2], args[3])
    )(tensor)
}

export const changeRange = (tensor: Tensor | TensorLike, start = 0, end = 1) => {
    const minTensor = min(tensor)
    const maxTensor = max(tensor)

    return mathOP(
        x => (x - minTensor) / (maxTensor - minTensor) * (end - start) + start
    )(tensor)
}
export const changeRangeArray = (tensor: Tensor | TensorLike, args = [0, 1]) => {
    const minTensor = min(tensor)
    const maxTensor = max(tensor)

    return mathOP(
        x => (x - minTensor) / (maxTensor - minTensor) * (args[1] - args[0]) + args[0]
    )(tensor)
}

export const map = (tensor: Tensor | TensorLike, func: (n: number) => number) => {

    return mathOP(
        x => func(x)
    )(tensor)
}

export const constrain = (tensor: Tensor | TensorLike, min: number, max: number) => {
    return mathOP(
        x => _constrain(x, min, max)
    )(tensor)
}
export const constrainArray = (tensor: Tensor | TensorLike, minmax: number[]) => {
    return mathOP(
        x => _constrain(x, minmax[0], minmax[1])
    )(tensor)
}

export const expNoInfinity = (tensor: Tensor | TensorLike, min = -50, max = 50): Tensor => {

    return mathOP(
        x => Math.exp(_constrain(x, min, max))
    )(tensor)
}
export const expNoInfinityArray = (tensor: Tensor | TensorLike, minmax = [-50, 50]): Tensor => {

    return mathOP(
        x => Math.exp(_constrain(x, minmax[0], minmax[1]))
    )(tensor)
}

export const logNoNan = (tensor: Tensor | TensorLike, min = 1e-100, max = Infinity): Tensor => {

    return mathOP(
        x => Math.log(_constrain(x, min, max))
    )(tensor)
}

export const varianceSquared = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    return mean(
        square(
            sub(internTensor, mean(internTensor))
        )
    )
}

export const variance = (tensor: Tensor | TensorLike) => {
    return Math.sqrt(varianceSquared(tensor))
}

export const softmax = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let trick = sub(internTensor, max(internTensor))
    return div(exp(trick), sumExp(trick))
}

export const softmax_prime = (tensor: Tensor | TensorLike) => {
    let internTensor = ensureTensor(tensor)
    let result: TensorLike2D = []
    let resultSize = internTensor.shape[0]
    for (let i = 0; i < resultSize; i++) {
        result[i] = []
        for (let j = 0; j < resultSize; j++) {
            if (i == j) {
                result[i][j] = internTensor.data[i] * (1 - internTensor.data[i])
            } else {
                result[i][j] = -internTensor.data[i] * internTensor.data[j]
            }
        }
    }
    return new Tensor(result, [resultSize, resultSize], 2)
}