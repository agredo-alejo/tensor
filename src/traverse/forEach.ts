import { TensorLike } from "../class"


export const forEach = (
    tensor: TensorLike,
    func: (n: number) => number
): TensorLike => {
    let recursion = (array: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                recursion(array[index])
            }
        } else {
            for (let index = 0; index < array.length; index++) {
                array[index] = func(array[index])
            }
        }
    }
    if (tensor instanceof Array) {
        recursion(tensor)
        return tensor
    }
    return func(tensor)
}


export const forEachReturn = (
    tensor: TensorLike,
    func: (n: number) => number
): TensorLike => {
    let recursion = (array: any[], resultArray: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                resultArray[index] = []
                recursion(array[index], resultArray[index])
            }
        } else {
            for (let index = 0; index < array.length; index++) {
                resultArray[index] = func(array[index])
            }
        }
    }

    if (tensor instanceof Array) {
        let result: TensorLike = []
        recursion(tensor, result)
        return result
    }
    return func(tensor)

}


export const forEachOfBoth = (
    tensor: TensorLike,
    tensor2: TensorLike,
    func: (n: number, n2: number) => number
): TensorLike => {
    let recursion = (array: any[], array2: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                recursion(array[index], array2[index])
            }
        } else {
            for (let index = 0; index < array.length; index++) {
                array[index] = func(array[index], array2[index])
            }
        }
    }
    if (tensor instanceof Array) {
        if (tensor2 instanceof Array) {
            recursion(tensor, tensor2)
            return tensor
        }
        return forEach(tensor, x => func(x, tensor2))
    } else if (tensor2 instanceof Array) {
        return forEachReturn(tensor2, x => func(x, tensor))
    }
    return func(tensor, tensor2)
}


export const forEachOfBothReturn = (
    tensor: TensorLike,
    tensor2: TensorLike,
    func: (n: number, n2: number) => number
): TensorLike => {

    let recursion = (array: any[], array2: any[], resultArray: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                resultArray[index] = []
                recursion(array[index], array2[index], resultArray[index])
            }
        } else {
            for (let index = 0; index < array.length; index++) {
                resultArray[index] = func(array[index], array2[index])
            }
        }
    }

    if (tensor instanceof Array) {
        if (tensor2 instanceof Array) {
            let result: TensorLike = []
            recursion(tensor, tensor2, result)
            return result
        }
        return forEachReturn(tensor, x => func(x, tensor2))
    } else if (tensor2 instanceof Array) {
        return forEachReturn(tensor2, x => func(x, tensor))
    }
    return func(tensor, tensor2)
}

