import { TensorLike } from "./types";

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
}