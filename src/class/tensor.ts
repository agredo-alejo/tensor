import { TensorArray, TensorLike } from "./types";
import { copy, shapesEqual, size, _constrain, _inferRank, _inferShape, _remap } from "../utils";
import { add, div, divNoNan, exp, floorDiv, floorDivNoNan, mult, neg, pow, sqd, sqrt, square, sub } from "../operations";
import { dot, dotMxM, dotMxV, dotVxM, dotVxV, mirrorHorizontally, mirrorVertically, rotate180, rotate270, rotate90, transpose } from "../matrix";
import { broadcastArgs, broadcastTo, flatten, reshape, shuffle, tile, vectorToTensor } from "../transform";
import { max, mean, sum, sumExp } from "../reduction";
import { accesLastArray, accesLastArrays, forEach, forEachOfBoth } from "../traverse";


export class Tensor {

    data: any;
    shape: number[];
    rank: number;

    constructor(data: TensorLike, shape: number[] = [], rank = shape.length) {
        this.data = data
        this.shape = shape
        this.rank = rank
    }

    set(tensor: Tensor) {
        this.data = tensor.data
        this.shape = tensor.shape
        this.rank = tensor.rank
        return this
    }

    setData(data: TensorLike, shape?: number[], rank?: number) {
        this.data = data
        this.shape = shape || _inferShape(data)
        this.rank = rank || this.shape.length
        return this
    }
    // Aritmethic
    add(tensor: Tensor | TensorLike) {
        return this.set(
            add(this, tensor)
        )
    }
    sub(tensor: Tensor | TensorLike) {
        return this.set(
            sub(this, tensor)
        )
    }

    mult(tensor: Tensor | TensorLike) {
        return this.set(
            mult(this, tensor)
        )
    }

    div(tensor: Tensor | TensorLike) {
        return this.set(
            div(this, tensor)
        )
    }

    divNoNan(tensor: Tensor | TensorLike) {
        return this.set(
            divNoNan(this, tensor)
        )
    }

    floorDiv(tensor: Tensor | TensorLike) {
        return this.set(
            floorDiv(this, tensor)
        )
    }

    floorDivNoNan(tensor: Tensor | TensorLike) {
        return this.set(
            floorDivNoNan(this, tensor)
        )
    }

    pow(tensor: Tensor | TensorLike) {
        return this.set(
            pow(this, tensor)
        )
    }

    sqd(tensor: Tensor | TensorLike) {
        return this.set(
            sqd(this, tensor)
        )
    }
    // Math
    square() {
        return this.set(
            square(this)
        )
    }

    sqrt() {
        return this.set(
            sqrt(this)
        )
    }

    remap(start1: number, end1: number, start2: number, end2: number) {
        return this.map(
            x => _remap(x, start1, end1, start2, end2)
        )
    }

    map(func: (n: number) => number) {
        this.forEach((x: number) => func(x))
        return this
    }

    neg(): Tensor {
        return this.set(
            neg(this)
        )
    }

    log(): Tensor {
        this.forEach((x: number) => x == 0 ? -1000 : Math.log(x))
        return this
    }

    constrain(arg: number | number[], max = 1): Tensor {
        let min: number, internMax: number
        if (arg instanceof Array) {
            min = arg[0]
            internMax = arg[1]
        } else {
            min = arg
            internMax = max
        }
        this.forEach((x: number) => Math.max(Math.min(x, internMax), min))
        return this
    }

    exp(): Tensor {
        return this.set(
            exp(this)
        )
    }
    // Matrix
    dot(tensor: Tensor) {
        return this.set(
            dot(this, tensor)
        )
    }
    dotMxM(tensor: Tensor) {
        return this.set(
            dotMxM(this, tensor)
        )
    }
    dotMxV(tensor: Tensor) {
        return this.set(
            dotMxV(this, tensor)
        )
    }
    dotVxM(tensor: Tensor) {
        return this.set(
            dotVxM(this, tensor)
        )
    }
    dotVxV(tensor: Tensor) {
        return this.set(
            dotVxV(this, tensor)
        )
    }
    transpose() {
        return this.set(
            transpose(this)
        )
    }
    mirrorHorizontally() {
        return this.set(
            mirrorHorizontally(this)
        )
    }
    mirrorVertically() {
        return this.set(
            mirrorVertically(this)
        )
    }
    rotate180() {
        return this.set(
            rotate180(this)
        )
    }
    rotate90() {
        return this.set(
            rotate90(this)
        )
    }
    rotate270() {
        return this.set(
            rotate270(this)
        )
    }
    // Util
    shuffle() {
        return this.setData(
            shuffle(this.data)
        )
    }

    fill(number = 0) {
        this.forEach(() => number)
        return this
    }

    size() {
        return size(this)
    }

    rangeOfValues(): number[] {
        let max = -Infinity
        let min = Infinity
        this.forEach((x: number) => {
            max = x > max ? x : max
            min = x < min ? x : min
            return x
        })
        return [min, max]
    }

    shapesEqual(shape: number[]) {
        return shapesEqual(this.shape, shape)
    }

    inferShape() {
        return _inferShape(this.data)
    }
    inferRank() {
        return _inferRank(this.data)
    }
    copy() {
        return copy(this)
    }
    // Random
    randomize(options: any[] = []) {
        let min = options[0] == undefined ? -1 : options[0]
        let max = options[1] == undefined ? 1 : options[1]
        let floor = options[2]
        if (floor == undefined) {
            this.forEach(() => Math.random() * (max - min) + min)
        } else {
            this.forEach(() => Math.floor(Math.random() * (max + 1 - min) + min))
        }
        return this
    }
    // Reduction
    mean(): number {
        return mean(this)
    }
    sumExp(): number {
        return sumExp(this)
    }
    max(): number {
        return max(this)
    }
    sum(): number {
        return sum(this)
    }
    // Transformations
    flatten() {
        return this.set(
            flatten(this)
        )
    }

    reshape(shape: number[]) {
        return reshape(this, shape)
    }

    vectorToTensor(shape: number[]) {
        return this.set(
            vectorToTensor(this, shape)
        )
    }

    tile(reps: number[]) {
        return this.set(
            tile(this, reps)
        )
    }
    broadcastTo(shape: number[]) {
        return this.set(
            broadcastTo(this, shape)
        )
    }
    broadcastArgs(shape: number[]): number[] {
        return broadcastArgs(this.shape, shape)
    }

    // Navigate through tensor
    forEach(func: (x: number) => number) {
        return forEach(this.data, func)
    }

    forEachOfBoth(tensor: TensorLike, func: (n: number, n2: number) => number) {
        return forEachOfBoth(this.data, tensor, func)
    }

    accesLastArray(func: (array: number[]) => any) {
        return accesLastArray(this.data, func)
    }

    accesLastArrays(tensorArray: TensorArray, func: (array: number[], array2: number[]) => any) {
        return accesLastArrays(this.data, tensorArray, func)
    }
    static serialize(tensor: Tensor) {
        return JSON.stringify(tensor)
    }
    static deserialize(object: Tensor) {
        if (typeof object == 'string') {
            object = JSON.parse(object)
        }
        return new Tensor(object.data, object.shape)
    }

}

