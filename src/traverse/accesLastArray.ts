import { TensorArray, TensorLike } from "../class"


export const accesLastArray = (tensorArray: TensorArray, func: (a: number[]) => void) => {
    let recursion = (array: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                recursion(array[index])
            }
        } else {
            func(array)
        }
    }
    recursion(tensorArray)
    return tensorArray
}

export const accesLastArrayReturn = (
    tensorArray: TensorArray,
    func: (a: number[], b: number[]) => void
) => {
    let result: TensorLike = []
    let recursion = (array: any[], resultArray: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                resultArray[index] = []
                recursion(array[index], resultArray[index])
            }
        } else {
            func(array, resultArray)
        }
    }
    recursion(tensorArray, result)
    return result
}

export const accesLastArrays = (
    tensorArray: TensorArray,
    tensorArray2: TensorArray,
    func: (a: number[], b: number[]) => void
) => {
    let recursion = (array: any[], array2: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                recursion(array[index], array2[index])
            }
        } else {
            func(array, array2)
        }
    }
    recursion(tensorArray, tensorArray2)
    return tensorArray
}

export const accesLastArraysReturn = (
    tensorArray: TensorArray,
    tensorArray2: TensorArray,
    func: (a: number[], b: number[], c: number[]) => void
) => {

    let result: TensorLike = []
    let recursion = (array: any[], array2: any[], resultArray: any[]) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                resultArray[index] = []
                recursion(array[index], array2[index], resultArray[index])
            }
        } else {
            func(array, array2, resultArray)
        }
    }
    recursion(tensorArray, tensorArray2, result)
    return result
}